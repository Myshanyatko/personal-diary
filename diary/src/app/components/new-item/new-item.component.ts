import { Router } from '@angular/router';
import { ItemService } from './../../services/item.service';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { addDoc, Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.less'],
})
export class NewItemComponent implements OnInit {
  itemForm!: FormGroup;
  constructor(
    private firestore: Firestore,
    private fb: FormBuilder,
    private itemService: ItemService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      content: new FormControl(),
      image: new FormControl(),
    });
  }
  newItem(event: HTMLInputElement) {
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
    this.router.navigate(['/'])
  }
}
