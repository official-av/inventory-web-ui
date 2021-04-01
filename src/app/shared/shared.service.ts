import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from "@app/app/_interfaces/User.interface";
import {parseJWT} from "@app/app/shared/utils/parseJWT";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  public curModule = '';
  private _userDetails: User;

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
      admin: parsedToken.isAdmin,
      email: parsedToken.email,
      lname: parsedToken.lname,
      fname: parsedToken.fname
    } as User;
  }

  public set userDetails(user: User) {
    this._userDetails = user;
  }

  public get userDetails(): User {
    return {...this._userDetails};
  }

  public logout() {
    localStorage.clear();
    this.router.navigate(['auth']);
  }
}
