import {
  CREATE_USER_COMPLETE,
  GET_USERS_COMPLETE,
  UPDATE_CREATE_USER,
  UserActions
} from '@app/app/users/state/users.actions';
import {UserState} from '@app/app/_interfaces/UserState.interface';

export const usersReducer = (state: UserState, action: UserActions) => {
  switch (action.type) {
    case GET_USERS_COMPLETE:
      console.log('Reducer: ' + GET_USERS_COMPLETE);
      return {...state, listUsersState: action.payload};
    case CREATE_USER_COMPLETE:
      console.log('Reducer: ' + CREATE_USER_COMPLETE);
      return {...state};
    case UPDATE_CREATE_USER:
      console.log('Reducer: ' + UPDATE_CREATE_USER);
      return {...state, createUserState: action.payload};
    default: {
      return {...state};
    }
  }
}
