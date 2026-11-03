import { Injectable, computed, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';
import { safeStorage } from '../../../shared/browser/safe-storage';
import { isJwtExpired } from './jwt';
import { LoginRequest } from './login-request.interface';
import { LoginResponse } from './login-response.interface';

const AUTH_STORAGE_KEY = 'auth';

/** Datos de la sesión que la interfaz puede mostrar (sin el token). */
export interface SessionUser {
  userName: string;
  imageUrl: string | null;
  roles: readonly string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly stored = signal<LoginResponse | null>(readStoredSession());

  /** Usuario de la sesión actual, o null si no hay sesión válida. */
  readonly user = computed<SessionUser | null>(() => {
    const session = this.stored();
    if (!session) return null;
    return { userName: session.userName, imageUrl: session.imageUrl, roles: session.role };
  });

  constructor(private http: HttpClient) {}

  login(dataRequest: LoginRequest) {
    return this.http.post<LoginResponse>(`${environment.apiUrl}`, dataRequest).pipe(
      tap((response) => {
        safeStorage.set(AUTH_STORAGE_KEY, JSON.stringify(response));
        this.stored.set(response);
      }),
    );
  }

  /** Hay sesión y su token no ha vencido. Si venció, la sesión se descarta. */
  isAuthenticated(): boolean {
    const session = this.stored();
    if (!session) return false;
    if (isJwtExpired(session.token, Date.now())) {
      this.logout();
      return false;
    }
    return true;
  }

  /** true si el usuario tiene al menos uno de los roles indicados. */
  hasAnyRole(roles: readonly string[]): boolean {
    const userRoles = this.user()?.roles ?? [];
    return roles.some((role) => userRoles.includes(role));
  }

  logout(): void {
    safeStorage.remove(AUTH_STORAGE_KEY);
    this.stored.set(null);
  }
}

/** Lee la sesión guardada y descarta cualquier valor con forma inesperada. */
function readStoredSession(): LoginResponse | null {
  const raw = safeStorage.get(AUTH_STORAGE_KEY);
  if (!raw) return null;
  try {
    const value: Partial<LoginResponse> = JSON.parse(raw);
    if (typeof value.token !== 'string' || typeof value.userName !== 'string') return null;
    return {
      token: value.token,
      userName: value.userName,
      imageUrl: typeof value.imageUrl === 'string' ? value.imageUrl : null,
      role: Array.isArray(value.role) ? value.role.filter((r) => typeof r === 'string') : [],
    };
  } catch {
    return null;
  }
}
