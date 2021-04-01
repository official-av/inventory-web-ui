import {User} from '@app/app/_interfaces/User.interface';

export interface UserState {
  listUsersState: Array<User>;
  createUserState: User;
}
