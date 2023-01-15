import { Item } from './../../models/Item';
import { Timestamp, DocumentSnapshot, DocumentData } from 'firebase/firestore';
import { ItemService } from './../../services/item.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { tap, Observable, map } from 'rxjs';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.less'],
})
export class EditItemComponent implements OnInit {
  itemForm!: FormGroup;
  item$: Observable<Item> | null = null;
  constructor(
    private fb: FormBuilder,
    private itemService: ItemService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        tap(({ id }) => {
          this.item$ = this.itemService.getItem(id);
        })
      )
      .subscribe();
    this.itemForm = this.fb.group({
      content: new FormControl(),
      image: new FormControl(),
    });
    this.item$?.subscribe((item: Item) => {
      this.itemForm.get('content')?.setValue(item.content);
    });
  }
  editItem(event: HTMLInputElement) {
    debugger
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
            )
          this.router.navigate(['/'])}
          
    
  }
}
