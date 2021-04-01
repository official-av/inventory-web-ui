import {GET_USERS_COMPLETE, UserActions} from '@app/app/users/state/users.actions';
import {UserState} from '@app/app/_interfaces/UserState.interface';

export const usersReducer = (state: UserState, action: UserActions) => {
  switch (action.type) {
    case GET_USERS_COMPLETE:
      console.log('Reducer: ' + GET_USERS_COMPLETE);
      return {...state, listUsersState: action.payload};
    default: {
      return {...state};
    }
  }
}
