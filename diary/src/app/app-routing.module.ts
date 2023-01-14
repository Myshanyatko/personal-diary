import { NewItemComponent } from './components/new-item/new-item.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'main', component: ItemListComponent },
  { path: '', component: ItemListComponent },
  {path: 'new-item', component: NewItemComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
