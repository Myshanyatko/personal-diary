import { AuthService } from './../../services/auth.service';

import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Item } from 'src/app/models/Item';

// компонент главной страницы - списка записей
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.less'],
})
export class ItemListComponent implements OnInit {
  // взяли поток записей из firebase
  items$: Observable<Item[]> = this.itemService.getItems();

  constructor(
    private authService: AuthService,
    private itemService: ItemService
  ) {}

  ngOnInit(): void {}

  // удаление записи
  deleteItem(item: Item) {
    this.itemService.deleteItem(item);
  }

  // выход из аккаунта
  logout() {
    this.authService.logout();
  }
}
