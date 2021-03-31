import {Injectable} from '@angular/core';
import {environment} from '@app/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginURL = `${environment.baseURL}/login`;

  constructor(private http: HttpClient) {
  }

  public login(email: string, password: string) {
    return this.http.post(this.loginURL, {email, password});
  }
}
