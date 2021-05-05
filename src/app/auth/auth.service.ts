import {Injectable} from '@angular/core';
import {environment} from '@app/environments/environment';
import {HttpClient} from '@angular/common/http';
import {take, tap} from 'rxjs/operators';
import {INVResponse} from '@app/app/_interfaces/INVResponse.interface';
import {SharedService} from '@app/app/shared/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginURL = `${environment.baseURL}/login`;

  constructor(private http: HttpClient, private shared: SharedService) {
  }

  public login(email: string, password: string) {
    return this.http.post<INVResponse>(this.loginURL, {email, password}).pipe(
      tap(res => this.shared.setUserToken(res.data.token)),
      take(1)
    );
  }
}
