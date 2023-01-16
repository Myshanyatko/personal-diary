import { MessagesService } from './messages.service';
import { getAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

// сервис для авторизации
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private messagesService: MessagesService,
    private router: Router
  ) {}

  // функция входа в аккаунт
  login(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
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
    const auth = getAuth();
    signOut(auth)
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
