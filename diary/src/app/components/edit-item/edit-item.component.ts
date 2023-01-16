import { Item } from './../../models/Item';
import { Timestamp } from 'firebase/firestore';
import { ItemService } from './../../services/item.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, Observable } from 'rxjs';

// компонент редактирования выранной записи
@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.less'],
})
export class EditItemComponent implements OnInit {
  itemForm!: FormGroup;
  item$: Observable<Item> | null = null;
  error = false;

  constructor(
    private itemService: ItemService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // достаем из url айди записи и запрашиваем по нему запись в firebase
    this.route.params
      .pipe(
        tap(({ id }) => {
          this.item$ = this.itemService.getItem(id);
        })
      )
      .subscribe();

    // инициация формы редактирования записи
    this.itemForm = this.fb.group({
      content: new FormControl(),
      image: new FormControl(),
    });

    // задаем первоночальное значение полю
    this.item$?.subscribe((item: Item) => {
      this.itemForm.get('content')?.setValue(item.content);
    });
  }

  // функкция обновления записи
  editItem(event: HTMLInputElement) {
    // проверка валидности полей
    if (!this.itemForm.value.content) {
      this.error = true;
    } else {
      if (event.files != null) {
        const file = event.files[0];
        this.itemService.editItem(
          {
            content: this.itemForm.value.content,
            date: Timestamp.now(),
            id: '',
            img: '',
          },
          file
        );
        this.router.navigate(['/']);
      }
    }
  }
}
