import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { ItemListComponent } from './components/item-list/item-list.component';
import { NewItemComponent } from './components/new-item/new-item.component';
import { EditorModule } from 'primeng/editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {FieldsetModule} from 'primeng/fieldset';
import {CardModule} from 'primeng/card';
import {FileUploadModule} from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [AppComponent, ItemListComponent, NewItemComponent],
  imports: [
    HttpClientModule,
    EditorModule,
    FileUploadModule,
    FieldsetModule,
    CardModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
