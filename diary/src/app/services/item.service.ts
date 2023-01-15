import { Observable } from 'rxjs';
import { Timestamp, doc, deleteDoc } from 'firebase/firestore';
import { Item } from './../models/Item';
import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import {
  getDoc,
  getDocs,
  addDoc,
  CollectionReference,
} from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  collect = collection(this.firestore, 'items');
  storage = getStorage();

  constructor(private firestore: Firestore) {}

  // получаем записи с firebase
  getItems(): Observable<Item[]> {
    return collectionData(this.collect, { idField: 'id' }) as Observable<
      Item[]
    >;
  }
  deleteItem(item: Item) {
    console.log(item.id);
    let docRef = doc(this.firestore, 'items', item.id);
    return deleteDoc(docRef);
  }

  uploadImage(file: File) {
    const storageRef = ref(this.storage, `images/${file.name}`);
    uploadBytes(storageRef, file).then(
      (snapshot) => alert(snapshot.ref),
      (err) => alert(err)
    );
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
        );
      });
    } else addDoc(this.collect, item);
  }
}
