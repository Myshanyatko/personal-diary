import { doc, getDoc, getDocs, getFirestore } from 'firebase/firestore';
import { ItemService } from './../../services/item.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  collection,
  collectionData,
  Firestore,
  onSnapshot,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Item } from 'src/app/models/Item';
import { Database } from '@angular/fire/database';
import { onValue, ref } from 'firebase/database';
import { initializeApp } from '@angular/fire/app';

@Component({
  selector: 'app-item-list',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.less'],
})
export class ItemListComponent implements OnInit {
  items$:  Observable<Item[]> = this.itemService.getItems()
  constructor(private itemService: ItemService, private firestore: Firestore) {}

  ngOnInit(): void {
    this.items$.subscribe(item => console.log(item))
    
    
  }
  deleteItem(item: Item){
    this.itemService.deleteItem(item)
  }
}
