import {Action} from "@ngrx/store";
import {Inventory} from '@app/app/_interfaces/Inventory.interface';
import {INVResponse} from '@app/app/_interfaces/INVResponse.interface';

export const GET_INVENTORIES_INIT = 'Get Inventories Init';
export const GET_INVENTORIES_DONE = 'Get Inventories Done';
export const CREATE_INVENTORY_INIT = 'Create Inventory Init';
export const CREATE_INVENTORY_DONE = 'Create Inventory Done';
export const UPDATE_CREATE_INVENTORY = 'Update Create Inventory';
export const FETCH_INVENTORY_INIT = 'Fetch Inventory Init';
export const FETCH_INVENTORY_DONE = 'Fetch Inventory Done';
export const DELETE_INVENTORY_INIT = 'Delete Inventory Init';
export const DELETE_INVENTORY_DONE = 'Delete Inventory Done';
export const EDIT_INVENTORY_INIT = 'Edit Inventory Init';
export const EDIT_INVENTORY_DONE = 'Edit Inventory Done';

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

export class FetchInventoryInit implements Action {
  readonly type = FETCH_INVENTORY_INIT;

  constructor(public payload: number) {
    console.log('Action: ' + FETCH_INVENTORY_INIT);
  }
}

export class FetchInventoryDone implements Action {
  readonly type = FETCH_INVENTORY_DONE;

  constructor(public payload: Inventory) {
    console.log('Action: ' + FETCH_INVENTORY_DONE);
  }
}

export class DeleteInventoryInit implements Action {
  readonly type = DELETE_INVENTORY_INIT;

  constructor(public payload: number) {
    console.log('Action: ' + DELETE_INVENTORY_INIT);
  }
}

export class DeleteInventoryDone implements Action {
  readonly type = DELETE_INVENTORY_DONE;

  constructor(public payload: INVResponse) {
    console.log('Action: ' + DELETE_INVENTORY_DONE);
  }
}

export class EditInventoryInit implements Action {
  readonly type = EDIT_INVENTORY_INIT;

  constructor(public payload: Inventory) {
    console.log('Action: ' + EDIT_INVENTORY_INIT);
  }
}

export class EditInventoryDone implements Action {
  readonly type = EDIT_INVENTORY_DONE;

  constructor(public payload: INVResponse) {
    console.log('Action: ' + EDIT_INVENTORY_DONE);
  }
}


export type InventoryActions =
  GetInventoriesInit
  | GetInventoriesDone
  | CreateInventoryInit
  | CreateInventoryDone
  | UpdateCreateInventory
  | FetchInventoryInit
  | FetchInventoryDone
  | DeleteInventoryInit
  | DeleteInventoryDone;
