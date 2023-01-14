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

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  collect = collection(this.firestore, 'items');
  constructor(private firestore: Firestore) {}

  // получаем записи с firebase
  getItems(): Observable<Item[]> {
    return collectionData(this.collect, {idField:'id'}) as Observable<Item[]>;
  }
  deleteItem(item: Item) {
    console.log(item.id);
    let docRef = doc(this.firestore, 'items', item.id);
    return deleteDoc(docRef);
  }

  // добавить новую запись
  createItem(item: Item) {
    item.id = doc(collection(this.firestore, `id`)).id;
    return addDoc(this.collect, item);
  }
}
