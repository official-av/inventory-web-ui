import {Injectable} from '@angular/core';
import {UserService} from '../user.service';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {CompleteGetUsers, INITIATE_GET_USERS, InitiateGetUsers} from '@app/app/users/state/users.actions';
import {map, switchMap} from 'rxjs/operators';
import {User} from '@app/app/_interfaces/User.interface';

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
}
