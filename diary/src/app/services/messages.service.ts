import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

// сервис для всплывающих сообщений
@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  constructor(private messageService: MessageService) {}

  // показать сообщение об успехе
  success(message: string) {
    this.messageService.add({ severity: 'success', summary: message });
  }

  // показать сообщение об ошибке
  error(message: string) {
    this.messageService.add({ severity: 'error', summary: message });
  }
}
