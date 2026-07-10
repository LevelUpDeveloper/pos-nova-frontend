import { Component } from '@angular/core';
import { AuthService } from './../../../core/services/auth/auth.service';
import {FormsModule} from '@angular/forms';
import { LoginRequest } from '../../../core/services/auth/login-request.interface';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string = '';
  password: string = '';

  errorMessage: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onLogin() {

    const dataRequest: LoginRequest = {
      email: this.email,
      password: this.password
    };

    this.authService.login(dataRequest).subscribe({
      next: response => {
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        this.errorMessage = error.error.Message;
      }
    })

  }
}


