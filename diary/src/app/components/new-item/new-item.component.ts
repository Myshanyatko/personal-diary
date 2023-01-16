import { Router } from '@angular/router';
import { ItemService } from './../../services/item.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.less'],
})
export class NewItemComponent implements OnInit {
  itemForm!: FormGroup;
  error = false;

  constructor(
    private itemService: ItemService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    // инициация формы редактирования записи
    this.itemForm = this.fb.group({
      content: new FormControl('', [Validators.required]),
    });
  }

  // функкция создания новой записи
  newItem(event: HTMLInputElement) {
    // проверка валидности полей
    if (!this.itemForm.value.content) {
      this.error = true;
    } else {
      if (event.files != null) {
        const file = event.files[0];
        this.itemService.createItem(
          {
            content: this.itemForm.value.content,
            date: Timestamp.now(),
            id: '',
            img: '',
          },
          file
        );
      }
      this.error = false;
      this.router.navigate(['/']);
    }
  }
}
