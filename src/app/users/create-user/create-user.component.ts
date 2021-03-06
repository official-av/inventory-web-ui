import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {environment} from '@app/environments/environment';
import {State} from '@app/app/_interfaces/State.interface';
import {select, Store} from '@ngrx/store';
import {User} from '@app/app/_interfaces/User.interface';
import {CREATE_USER_COMPLETE, InitiateCreateUser, UpdateCreateUser} from '@app/app/users/state/users.actions';
import {selectCreateUserState} from '@app/app/users/state/users.state';
import {Observable} from 'rxjs';
import {Actions, ofType} from '@ngrx/effects';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  formData$: Observable<User>;
  userForm = new FormGroup({
    fname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]{1,30}$/)]),
    lname: new FormControl('', [Validators.required, Validators.pattern(/^[A-Za-z]{1,30}$/)]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.pattern(environment.pwdRegex), Validators.required]),
    contact: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]{10}$/)])
  });

  constructor(private store: Store<State>, private action$: Actions) {
    this.action$.pipe(
      ofType(CREATE_USER_COMPLETE)
    ).subscribe(val => this.resetForm());
  }

  ngOnInit(): void {
    this.formData$ = this.store.pipe(select(selectCreateUserState));
    this.formData$.subscribe((val: User) => this.fillFormFromValues(val));
  }

  private fillFormFromValues(user: User) {
    if (user && Object.keys(user).length > 0) {
      this.userForm.setValue(user);
    }
  }

  private resetForm() {
    this.userForm.reset();
    this.store.dispatch(new UpdateCreateUser({} as User));
  }

  public doSubmit() {
    const user = this.userForm.value as User;
    this.store.dispatch(new UpdateCreateUser(user));
    this.store.dispatch(new InitiateCreateUser(user));
  }

}
