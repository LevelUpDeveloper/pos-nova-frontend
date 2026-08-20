import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

import { AuthService } from './../../../core/services/auth/auth.service';
import { LoginRequest } from '../../../core/services/auth/login-request.interface';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly fb = inject(FormBuilder);
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  errorMessage: string = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly cdr: ChangeDetectorRef
  ) { }

  onLogin() {

    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    const dataRequest: LoginRequest = {
      email: this.loginForm.get('email')?.value || '',
      password: this.loginForm.get('password')?.value || ''
    };

    this.authService.login(dataRequest).subscribe({
      next: response => {
        this.router.navigate(['/admin-panel.component']);
      },

      error: error => {

        this.errorMessage = error.error?.Message
          || 'Correo o contraseña incorrectos';
          
          this.cdr.markForCheck();
      }
    })

  }
}