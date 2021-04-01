import {Injectable} from '@angular/core';
import {UserService} from '../user.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  CompleteGetUsers,
  CreateUserComplete,
  INITIATE_CREATE_USER,
  INITIATE_GET_USERS,
  InitiateCreateUser,
  InitiateGetUsers
} from '@app/app/users/state/users.actions';
import {map, switchMap} from 'rxjs/operators';
import {User} from '@app/app/_interfaces/User.interface';
import {INVResponse} from '@app/app/_interfaces/INVResponse.interface';

@Injectable()
export class UsersEffects {
  constructor(private action$: Actions, private usersService: UserService) {
  }

  @Effect()
  public initiateFetchUsersEffect$ = this.action$.pipe(
    ofType(INITIATE_GET_USERS),
    switchMap((action: InitiateGetUsers) =>
      this.usersService.getAllUsers().pipe(
        map((val: Array<User>) => new CompleteGetUsers(val))
      )
    )
  );

  @Effect()
  public initiateCreateUserEffect$ = this.action$.pipe(
    ofType(INITIATE_CREATE_USER),
    switchMap((action: InitiateCreateUser) =>
      this.usersService.registerUser(action.payload).pipe(
        map((val: INVResponse) => new CreateUserComplete(val))
      )
    )
  );
}
