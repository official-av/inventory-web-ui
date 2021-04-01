import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '@app/environments/environment';
import {User} from '@app/app/_interfaces/User.interface';
import {flatMap} from 'rxjs/operators';
import {INVResponse} from '@app/app/_interfaces/INVResponse.interface';
import {of} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL = `${environment.baseURL}/user`;
  registerURL = `${environment.baseURL}/register`;

  constructor(private http: HttpClient, private toastr: ToastrService) {
  }

  public getAllUsers() {
    return this.http.get(this.userURL)
      .pipe(
        flatMap((val: INVResponse) => of(val.data as Array<User>))
      );
  }

  public registerUser(user: User) {
    return this.http.post(this.registerURL, user);
  }
}
