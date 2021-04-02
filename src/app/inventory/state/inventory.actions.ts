import {Action} from "@ngrx/store";
import {Inventory} from '@app/app/_interfaces/Inventory.interface';

export const GET_INVENTORIES_INIT = 'Get Inventories Init';
export const GET_INVENTORIES_DONE = 'Get Inventories Done';

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

export type InventoryActions = GetInventoriesInit | GetInventoriesDone;
