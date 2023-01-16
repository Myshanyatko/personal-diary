import { MessagesService } from './messages.service';
import { from, Observable } from 'rxjs';
import {
  Timestamp,
  doc,
  deleteDoc,
  DocumentSnapshot,
  DocumentData,
  setDoc,
  updateDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import { Item } from './../models/Item';
import { Injectable } from '@angular/core';
import {
  Firestore,
  collectionData,
  collection,
  docData,
} from '@angular/fire/firestore';
import {
  getDoc,
  getDocs,
  addDoc,
  CollectionReference,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getDatabase } from '@angular/fire/database';
import { orderByChild, set } from 'firebase/database';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class ItemService {
  id = sessionStorage.getItem('email');
  collect = collection(this.firestore, 'users/' + this.id + '/items');
  storage = getStorage();
  editedItemId = '';
  constructor(
    private firestore: Firestore,
    private messagesService: MessagesService
  ) {}

  // получаем записи с firebase
  getItems(): Observable<Item[]> {
    const q = query(this.collect, orderBy('date', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Item[]>;
  }
  getItem(id: string): Observable<Item> {
    const docRef = doc(this.collect, id);
    getDoc(docRef).then((data) => (this.editedItemId = data.id));
    return docData(docRef) as Observable<Item>;
  }

  deleteItem(item: Item) {
    let docRef = doc(this.firestore, 'users/' + this.id + '/items', item.id);
    return deleteDoc(docRef)
      .then(() => this.messagesService.success('запись успешно удалена'))
      .catch((err) => this.messagesService.error(err));
  }

  // добавить новую запись
  async createItem(item: Item, file?: File) {
    item.id = doc(collection(this.firestore, `id`)).id;
    if (file) {
      const storageRef = ref(this.storage, `images/${file.name}`);
      uploadBytes(storageRef, file).then(() => {
        getDownloadURL(storageRef).then((url) =>
          addDoc(this.collect, {
            content: item.content,
            id: item.id,
            date: item.date,
            img: url,
          })
        ).then(() => this.messagesService.success('запись успешно создана'))
        .catch((err) => this.messagesService.error(err));
      });
    } else addDoc(this.collect, item).then(() => this.messagesService.success('запись успешно создана'))
    .catch((err) => this.messagesService.error(err));
  }
  //редактировать запись
  async editItem(item: Item, file?: File) {
    const docRef = doc(this.collect, this.editedItemId);
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
    } else
      updateDoc(docRef, {
        content: item.content,
        date: item.date,
      })
        .then(() => this.messagesService.success('запись успешно изменена'))
        .catch((err) => this.messagesService.error(err));
  }
}
