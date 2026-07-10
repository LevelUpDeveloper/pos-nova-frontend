import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { LoginRequest } from './login-request.interface';
import { LoginResponse } from './login-response.interface';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient){}
  
  login(dataRequest: LoginRequest) {
  return this.http.post<LoginResponse>(
    `${environment.apiUrl}`,
    dataRequest
  ).pipe(
    tap(response => {
      localStorage.setItem(
        'auth',
        JSON.stringify(response)
      );
    })
  );
}
}
