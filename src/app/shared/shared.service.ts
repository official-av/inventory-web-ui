import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '@app/app/_interfaces/User.interface';
import {parseJWT} from '@app/app/shared/utils/parseJWT';
import {ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public curModule = '';
  private user: User;
  public userDetailsSubject$ = new ReplaySubject();

  constructor(private router: Router) {
    const token = localStorage.getItem('token');
    if (token) {
      this.initUserDetails(token);
    }
  }

  public setUserToken(token) {
    localStorage.setItem('token', token);
    this.router.navigate(['']);
    this.initUserDetails(token);
  }

  public initUserDetails(token) {
    const parsedToken = parseJWT(token);
    this.userDetails = {
      id: parsedToken.id,
      admin: parsedToken.admin,
      email: parsedToken.email,
      lname: parsedToken.lname,
      fname: parsedToken.fname
    } as User;
  }

  public set userDetails(user: User) {
    this.user = user;
    this.userDetailsSubject$.next(user);
  }

  public get userDetails(): User {
    return {...this.user};
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['auth']);
    this.userDetails = {} as User;
  }
}
