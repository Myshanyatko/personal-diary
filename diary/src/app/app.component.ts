import { Message } from 'primeng-lts/api';
import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  // массив всплывающих сообщений
  msgs: Message[] = [];
  title = 'diary';
}
