import {InventoryState} from '@app/app/_interfaces/InventoryState.interface';
import {GET_INVENTORIES_DONE, InventoryActions} from '@app/app/inventory/state/inventory.actions';

export const inventoryReducers = (state: InventoryState, action: InventoryActions) => {
  switch (action.type) {
    case GET_INVENTORIES_DONE:
      console.log('Reducer: ' + GET_INVENTORIES_DONE);
      return {...state, list: action.payload};
    default:
      return {...state};
  }
}

