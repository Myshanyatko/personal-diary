import { AuthService } from './../../services/auth.service';

import { ItemService } from './../../services/item.service';
import { Component, OnInit} from '@angular/core';
import {
  Firestore,
} from '@angular/fire/firestore';
import {  Observable } from 'rxjs';
import { Item } from 'src/app/models/Item';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.less'],
})
export class ItemListComponent implements OnInit {
  items$:  Observable<Item[]> = this.itemService.getItems()
  constructor(private authService: AuthService, private itemService: ItemService, private firestore: Firestore) {}

  ngOnInit(): void {
  }
  deleteItem(item: Item){
    this.itemService.deleteItem(item)
  }
  logout(){
this.authService.logout()
  }
}
