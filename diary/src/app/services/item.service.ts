import { MessagesService } from './messages.service';
import { Observable } from 'rxjs';
import { doc, deleteDoc, updateDoc, query, orderBy } from 'firebase/firestore';
import { Item } from './../models/Item';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  docData,
} from '@angular/fire/firestore';
import { getDoc, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// сервис для работы с записями
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  // берем id текущего пользователя
  id = sessionStorage.getItem('id');
  // ссылка на коллекцию записей пользователя в firestore
  collect = collection(this.firestore, 'users/' + this.id + '/items');
  // инициация storage, там картинки записей хранятся
  storage = getStorage();
  // переменная для хранения айди редактируемой записи
  editedItemId = '';

  constructor(
    private firestore: Firestore,
    private messagesService: MessagesService
  ) {}

  // получаем записи с firebase
  getItems(): Observable<Item[]> {
    // запрос с сортировкой
    const q = query(this.collect, orderBy('date', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Item[]>;
  }

  // получить одну запись
  getItem(id: string): Observable<Item> {
    const docRef = doc(this.collect, id);
    getDoc(docRef).then((data) => (this.editedItemId = data.id));
    return docData(docRef) as Observable<Item>;
  }

  // удаление записи из firebase по id
  deleteItem(item: Item) {
    let docRef = doc(this.firestore, 'users/' + this.id + '/items', item.id);
    return (
      deleteDoc(docRef)
        // сообщение об успехе
        .then(() => this.messagesService.success('запись успешно удалена'))
        // сообщение об ошибке
        .catch((err) => this.messagesService.error(err))
    );
  }

  // добавить новую запись
  async createItem(item: Item, file?: File) {
    // генерируем новый id для записи
    item.id = doc(collection(this.firestore, `id`)).id;
    // если была прикреплена фотография
    if (file) {
      // создаем ссылку на фотографию в storage
      const storageRef = ref(this.storage, `images/${file.name}`);
      // загружаем фотографию по этой ссылке
      uploadBytes(storageRef, file).then(() => {
        // получаем url для загрузки фотографии
        getDownloadURL(storageRef)
          .then((url) =>
            // добавляем запись в firebase
            addDoc(this.collect, {
              content: item.content,
              id: item.id,
              date: item.date,
              img: url,
            })
          )
          .then(() => this.messagesService.success('запись успешно создана'))
          .catch((err) => this.messagesService.error(err));
      });
    }
    // если не была прикреплена фотография
    else
      addDoc(this.collect, item)
        .then(() => this.messagesService.success('запись успешно создана'))
        .catch((err) => this.messagesService.error(err));
  }

  //редактировать запись
  async editItem(item: Item, file?: File) {
    // ссылка на редактируемую запись
    const docRef = doc(this.collect, this.editedItemId);
    // если была прикреплена новая фотка
    if (file) {
      const storageRef = ref(this.storage, `images/${file.name}`);
      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then((url) =>
          updateDoc(docRef, {
            content: item.content,
            date: item.date,
            img: url,
          })
            .then(() => this.messagesService.success('запись успешно изменена'))
            .catch((err) => this.messagesService.error(err))
        );
      });
    }
    // если фотография не была прикреплена
    else
      updateDoc(docRef, {
        content: item.content,
        date: item.date,
      })
        .then(() => this.messagesService.success('запись успешно изменена'))
        .catch((err) => this.messagesService.error(err));
  }
}
