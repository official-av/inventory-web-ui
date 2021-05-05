import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '@app/environments/environment';
import {AuthService} from '@app/app/auth/auth.service';
import {SharedService} from '@app/app/shared/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern(environment.pwdRegex), Validators.required]),
  });

  constructor(private auth: AuthService, private shared: SharedService) {
  }

  public doSubmit() {
    this.auth.login(this.loginForm.get('email').value, this.loginForm.get('password').value)
      .subscribe((val: any) => {
        this.shared.setUserToken(val.data.token);
      });
  }

}
