import { Component, computed, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from './../../../core/services/auth/auth.service';
import { LoginRequest } from '../../../core/services/auth/login-request.interface';
import { CoinsBackgroundComponent } from './components/coins-background/coins-background.component';
import { GamePanelComponent } from './components/game-panel/game-panel.component';
import { InfoPanelComponent } from './components/info-panel/info-panel.component';
import { injectMediaQuery, injectNow, injectOnline } from './shared/browser-signals';
import { SHORT_DATE_FORMAT, TIME_FORMAT } from './shared/date-formats';
import { GameRecordsService } from './shared/game-records.service';
import { LOGIN_ERRORS, LOGIN_INFO } from './login.config';

type LoginState = 'idle' | 'submitting' | 'error' | 'success';

const SHAKE: Keyframe[] = [
  { transform: 'translateX(0)' },
  { transform: 'translateX(-6px)' },
  { transform: 'translateX(6px)' },
  { transform: 'translateX(-6px)' },
  { transform: 'translateX(6px)' },
  { transform: 'translateX(0)' },
];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CoinsBackgroundComponent, InfoPanelComponent, GamePanelComponent],
  providers: [GameRecordsService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private readonly fb = inject(FormBuilder);
  private readonly records = inject(GameRecordsService);
  private readonly ticket = viewChild.required<ElementRef<HTMLFormElement>>('ticket');
  private readonly gamesDialog = viewChild.required<ElementRef<HTMLDialogElement>>('gamesDialog');

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  protected readonly info = LOGIN_INFO;
  protected readonly state = signal<LoginState>('idle');
  protected readonly errorMessage = signal('');
  protected readonly showPassword = signal(false);
  protected readonly formFocused = signal(false);
  protected readonly gamesOpen = signal(false);
  protected readonly isDesktop = injectMediaQuery('(min-width: 1024px)');
  protected readonly online = injectOnline();

  protected readonly now = injectNow();
  protected readonly printedDate = computed(() => SHORT_DATE_FORMAT.format(this.now()));
  protected readonly printedTime = computed(() => TIME_FORMAT.format(this.now()));
  protected readonly year = computed(() => this.now().getFullYear());

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    // En escritorio el panel de juegos es fijo: el modal deja de tener sentido.
    effect(() => {
      if (this.isDesktop()) this.closeGames();
    });
  }

  onLogin() {

    if (this.state() === 'submitting') return;

    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
      return;
    }

    const dataRequest: LoginRequest = {
      email: this.loginForm.get('email')?.value || '',
      password: this.loginForm.get('password')?.value || ''
    };

    this.state.set('submitting');
    this.errorMessage.set('');

    this.authService.login(dataRequest).subscribe({
      next: response => {
        this.state.set('success');
        this.records.signPending(response.userName);
        this.router.navigate(['/admin-panel']);
      },

      error: (error: HttpErrorResponse) => {
        this.errorMessage.set(this.messageFor(error));
        this.state.set('error');
        this.shakeTicket();
      }
    })

  }

  protected hasError(control: 'email' | 'password', error: string): boolean {
    const field = this.loginForm.controls[control];
    return field.touched && field.hasError(error);
  }

  protected isInvalid(control: 'email' | 'password'): boolean {
    const field = this.loginForm.controls[control];
    return field.touched && field.invalid;
  }

  protected onFormFocusIn(event: FocusEvent): void {
    this.formFocused.set(event.target instanceof HTMLInputElement);
  }

  protected openGames(): void {
    this.gamesOpen.set(true);
    this.gamesDialog().nativeElement.showModal();
  }

  protected closeGames(): void {
    const dialog = this.gamesDialog().nativeElement;
    if (dialog.open) dialog.close();
  }

  /** Mensajes genéricos según el estado HTTP; nunca el detalle del servidor. */
  private messageFor(error: HttpErrorResponse): string {
    if (error.status === 0) return LOGIN_ERRORS.network;
    if (error.status === 429) return LOGIN_ERRORS.tooManyAttempts;
    if (error.status >= 500) return LOGIN_ERRORS.server;
    return LOGIN_ERRORS.credentials;
  }

  private shakeTicket(): void {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    this.ticket().nativeElement.animate(SHAKE, { duration: 380, easing: 'cubic-bezier(.36,.07,.19,.97)' });
  }
}
