import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

// компонент авторизации
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less'],
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  error = false;
  constructor(private authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    // инициация формы авторизации
    this.authForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  // функция для входа в аккаунт
  login() {
    // проверка на валидность полей
    if (!this.authForm.value.password || !this.authForm.value.email) {
      this.error = true;
    } else {
      this.authService.login(
        this.authForm.value.email,
        this.authForm.value.password
      );
      this.error = false;
    }
  }
}
