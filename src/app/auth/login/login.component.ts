import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '@app/environments/environment';
import {AuthService} from '@app/app/auth/auth.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {SharedService} from "@app/app/shared/shared.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern(environment.pwdRegex), Validators.required]),
  });

  constructor(private auth: AuthService, private toastr: ToastrService, private shared: SharedService) {
  }

  ngOnInit(): void {
  }

  public doSubmit() {
    this.auth.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe((val: any) => {
        console.log(val);
        this.toastr.success(val.message);
        this.shared.setUserToken(val.token);
      },
      err => this.toastr.error(err.message)
    );
  }

}
