import { from, Observable } from 'rxjs';
import {
  Timestamp,
  doc,
  deleteDoc,
  DocumentSnapshot,
  DocumentData,
  setDoc,
  updateDoc,
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
import { set } from 'firebase/database';
import firebase from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class ItemService {
   id = sessionStorage.getItem('email')
  collect = collection(this.firestore, 'users/'+this.id+'/items');
  storage = getStorage();
  editedItemId = '';
  constructor(private firestore: Firestore) {}

  // получаем записи с firebase
  getItems(): Observable<Item[]> {
    return collectionData(this.collect, { idField: 'id' }) as Observable<
      Item[]
    >;
  }
  getItem(id: string): Observable<Item> {
    const docRef = doc(this.collect, id);
    getDoc(docRef).then((data) => (this.editedItemId = data.id));
    return docData(docRef) as Observable<Item>;
  }

  deleteItem(item: Item) {
    console.log(item.id);
    let docRef = doc(this.firestore, 'items', item.id);
    return deleteDoc(docRef);
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
        );
      });
    } else
      updateDoc(docRef, {
        content: item.content,
        date: item.date,
      });
  }
}
