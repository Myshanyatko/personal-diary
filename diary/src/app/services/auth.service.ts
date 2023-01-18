
import { MessagesService } from './messages.service';
import { Router } from '@angular/router';
import { Inject, Injectable } from '@angular/core';
import {Auth, signInWithEmailAndPassword, signOut} from '@angular/fire/auth';

// сервис для авторизации
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
   private auth: Auth,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  // функция входа в аккаунт
  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredentinals) => {
        // id пользователя хранится в sessionStorage
        sessionStorage.setItem('id', userCredentinals.user.uid);
        // переходим на главную страницу после успешной авторизации
        this.router.navigate(['/']);
      })
      // если ошибка, выбрасываем соответствующее сообщение
      .catch((err) => this.messagesService.error(err));
  }

  // функция выхода из аккаунта
  logout() {
    signOut(this.auth)
      .then(() => {
        // чистим sessionStorage
        sessionStorage.removeItem('id');
        // перебрасываем на страницу аутентификации
        this.router.navigate(['auth']);
      })
      // или выбрасываем сообщение об ошибке
      .catch((err) => this.messagesService.error(err));
  }
}
