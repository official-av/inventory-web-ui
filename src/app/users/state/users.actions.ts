import {User} from '@app/app/_interfaces/User.interface';
import {Action} from '@ngrx/store';

export const INITIATE_GET_USERS = 'Get Users Start';
export const GET_USERS_COMPLETE = 'Get Users Complete';

export class InitiateGetUsers implements Action {
  readonly type = INITIATE_GET_USERS;

  constructor(public payload: Array<User>) {
    console.log('Action: ' + INITIATE_GET_USERS);
  }
}

export class CompleteGetUsers implements Action {
  readonly type = GET_USERS_COMPLETE;

  constructor(public payload: Array<User>) {
    console.log('Action: ' + GET_USERS_COMPLETE);
  }
}

export type UserActions = CompleteGetUsers | InitiateGetUsers;
