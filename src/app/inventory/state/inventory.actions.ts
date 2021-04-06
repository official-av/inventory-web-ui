import {Action} from "@ngrx/store";
import {Inventory} from '@app/app/_interfaces/Inventory.interface';
import {INVResponse} from '@app/app/_interfaces/INVResponse.interface';

export const GET_INVENTORIES_INIT = 'Get Inventories Init';
export const GET_INVENTORIES_DONE = 'Get Inventories Done';
export const CREATE_INVENTORY_INIT = 'Create Inventory Init';
export const CREATE_INVENTORY_DONE = 'Create Inventory Done';
export const UPDATE_CREATE_INVENTORY = 'Update Create Inventory';

export class GetInventoriesInit implements Action {
  readonly type = GET_INVENTORIES_INIT;

  constructor() {
    console.log('Action: ' + GET_INVENTORIES_INIT);
  }
}

export class GetInventoriesDone implements Action {
  readonly type = GET_INVENTORIES_DONE;

  constructor(public payload: Array<Inventory>) {
    console.log('Action: ' + GET_INVENTORIES_DONE);
  }
}

export class CreateInventoryInit implements Action {
  readonly type = CREATE_INVENTORY_INIT;

  constructor(public payload: Inventory) {
    console.log('Action: ' + CREATE_INVENTORY_INIT);
  }
}

export class CreateInventoryDone implements Action {
  readonly type = CREATE_INVENTORY_DONE;

  constructor(public payload: INVResponse) {
    console.log('Action: ' + CREATE_INVENTORY_DONE);
  }
}

export class UpdateCreateInventory implements Action {
  readonly type = UPDATE_CREATE_INVENTORY;

  constructor(public payload: Inventory) {
    console.log('Action: ' + UPDATE_CREATE_INVENTORY);
  }
}

export type InventoryActions =
  GetInventoriesInit
  | GetInventoriesDone
  | CreateInventoryInit
  | CreateInventoryDone
  | UpdateCreateInventory;
