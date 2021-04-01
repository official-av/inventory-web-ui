import {UserState} from '@app/app/_interfaces/UserState.interface';
import {UsersEffects} from '@app/app/users/state/users.effects';
import {createSelector} from '@ngrx/store';
import {selectUserState} from '@app/app/app.state';

export const selectUsersListState = createSelector(selectUserState, (s: UserState) => s.listUsersState);
export const usersEffectsArr = [UsersEffects];
