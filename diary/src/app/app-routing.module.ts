import { EditItemComponent } from './components/edit-item/edit-item.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'main', component: ItemListComponent },
  { path: '', component: ItemListComponent },
  {path: 'new-item', component: NewItemComponent},
  {path: 'edit-item/:id', component: EditItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
