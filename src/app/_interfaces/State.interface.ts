import {Inventory} from '@app/app/_interfaces/Inventory.interface';
import {UserState} from '@app/app/_interfaces/UserState.interface';

export interface State {
  userState: UserState;
  inventoryState: Inventory;
}
