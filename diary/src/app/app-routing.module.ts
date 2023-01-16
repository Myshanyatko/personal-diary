import { AuthGuard } from './guards/auth.guard';
import { AuthComponent } from './components/auth/auth.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// роутинг
const routes: Routes = [
  { path: '', component: ItemListComponent, canActivate: [AuthGuard] },
  { path: 'auth', component: AuthComponent },
  { path: 'new-item', component: NewItemComponent, canActivate: [AuthGuard] },
  {
    path: 'edit-item/:id',
    component: EditItemComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
