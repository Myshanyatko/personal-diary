import { AuthService } from './../../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm!: FormGroup;
  constructor( private authService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.authForm = this.fb.group({
      email: ['',[Validators.email]],
      password: []
    })
  }
  login(){
    this.authService.login(this.authForm.value.email, this.authForm.value.password)
  }
}
