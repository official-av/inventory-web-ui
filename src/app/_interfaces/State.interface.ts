import {UserState} from '@app/app/_interfaces/UserState.interface';
import {InventoryState} from '@app/app/_interfaces/InventoryState.interface';

export interface State {
  userState: UserState;
  inventoryState: InventoryState;
}
