import {State} from '@app/app/_interfaces/state.interface';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {usersReducer} from '@app/app/users/state/users.reducers';
import {User} from '@app/app/_interfaces/User.interface';
import {UserState} from '@app/app/_interfaces/UserState.interface';
import {Inventory} from '@app/app/_interfaces/Inventory.interface';
import {InventoryState} from '@app/app/_interfaces/InventoryState.interface';
import {inventoryReducers} from '@app/app/inventory/state/inventory.reducers';

export const reducers = {
  userState: usersReducer,
  inventoryState: inventoryReducers
} as ActionReducerMap<State>;

// feature initial states
export const initialUsersState = {createUserState: {} as User, listUsersState: [] as User[]} as UserState;
export const initialInventoryState = {list: [] as Array<Inventory>, create: {} as Inventory} as InventoryState;

// app-level initial state
export const initialState = {userState: initialUsersState, inventoryState: initialInventoryState} as State;

// effects
export const effects = [];

// selectors
export const selectUserState = createFeatureSelector<State, UserState>('userState');
export const selectInventoryState = createFeatureSelector<State, InventoryState>('inventoryState');
