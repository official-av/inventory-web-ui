import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '@app/environments/environment';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  userForm = new FormGroup({
    fname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]{1,30}$]/)]),
    lname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]{1,30}$]/)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern(environment.pwdRegex), Validators.required]),
    contact: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]{10}$/)])
  });

  constructor() {
  }

  ngOnInit(): void {
  }

  doSubmit() {

  }

}
