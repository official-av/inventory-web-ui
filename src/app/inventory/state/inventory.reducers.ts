import {InventoryState} from '@app/app/_interfaces/InventoryState.interface';
import {
  CREATE_INVENTORY_DONE,
  FETCH_INVENTORY_DONE,
  GET_INVENTORIES_DONE,
  InventoryActions,
  UPDATE_CREATE_INVENTORY
} from '@app/app/inventory/state/inventory.actions';

export const inventoryReducers = (state: InventoryState, action: InventoryActions) => {
  switch (action.type) {
    case GET_INVENTORIES_DONE:
      console.log('Reducer: ' + GET_INVENTORIES_DONE);
      return {...state, list: action.payload};
    case CREATE_INVENTORY_DONE:
      console.log('Reducer: ' + CREATE_INVENTORY_DONE);
      return {...state, create: action.payload};
    case FETCH_INVENTORY_DONE:
      console.log('Reducer: ' + FETCH_INVENTORY_DONE);
      return {...state, create: action.payload};
    case UPDATE_CREATE_INVENTORY:
      console.log('Reducer: ' + UPDATE_CREATE_INVENTORY);
      return {...state, create: action.payload};
    default:
      return {...state};
  }
}

