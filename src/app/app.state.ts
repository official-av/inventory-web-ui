import {State} from '@app/app/_interfaces/state.interface';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {usersReducer} from '@app/app/users/state/users.reducers';
import {User} from '@app/app/_interfaces/User.interface';
import {UserState} from '@app/app/_interfaces/UserState.interface';

export const reducers = {userState: usersReducer} as ActionReducerMap<State>;

export const initialUsersState = {createUserState: {} as User, listUsersState: [] as User[]} as UserState;

export const initialState = {userState: initialUsersState} as State;

export const effects = [];

export const selectUserState = createFeatureSelector<State, UserState>('userState');
