import {User} from '@app/app/_interfaces/User.interface';
import {Action} from '@ngrx/store';
import {INVResponse} from '@app/app/_interfaces/INVResponse.interface';

export const INITIATE_GET_USERS = 'Get Users Start';
export const GET_USERS_COMPLETE = 'Get Users Complete';
export const INITIATE_CREATE_USER = 'Create Users Start';
export const CREATE_USER_COMPLETE = 'Create Users Complete';
export const UPDATE_CREATE_USER = 'Update Create User';

export class InitiateGetUsers implements Action {
  readonly type = INITIATE_GET_USERS;

  constructor(public payload: any) {
    console.log('Action: ' + INITIATE_GET_USERS);
  }
}

export class CompleteGetUsers implements Action {
  readonly type = GET_USERS_COMPLETE;

  constructor(public payload: Array<User>) {
    console.log('Action: ' + GET_USERS_COMPLETE);
  }
}

export class InitiateCreateUser implements Action {
  readonly type = INITIATE_CREATE_USER;

  constructor(public payload: User) {
    console.log('Action: ' + INITIATE_CREATE_USER);
  }
}

export class CreateUserComplete implements Action {
  readonly type = CREATE_USER_COMPLETE;

  constructor(public payload: INVResponse) {
    console.log('Action: ' + CREATE_USER_COMPLETE);

  }
}

export class UpdateCreateUser implements Action {
  readonly type = UPDATE_CREATE_USER;

  constructor(public payload: User) {
    console.log('Action: ' + UPDATE_CREATE_USER);
  }
}

export type UserActions = CompleteGetUsers | InitiateGetUsers | CreateUserComplete | InitiateCreateUser|UpdateCreateUser;
