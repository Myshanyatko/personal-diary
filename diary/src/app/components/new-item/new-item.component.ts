import { ItemService } from './../../services/item.service';
import { Observable } from 'rxjs';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { addDoc, Timestamp } from 'firebase/firestore';
import Quill from 'quill';

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
    private itemService: ItemService
  ) {}

  ngOnInit(): void {
    var x = document.getElementById('editor');
    x!.innerHTML = ' I like <i>Coffee</i>';

    this.itemForm = this.fb.group({
      content: new FormControl(),
      image: new FormControl(),
    });
  }
  newItem(file: File) {
    this.itemService.createItem({
      content: this.itemForm.value.content,
      date: Timestamp.now(),
      id: '',
      img: '',
    }, file);

    
  }
  uploadImage(event: HTMLInputElement) {
    debugger;
    if (event.files != null) {
      const file = event.files[0];
      this.itemService.uploadImage(file);
      this.newItem(file)
    }
   
    
  }
}
