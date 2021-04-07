import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {
  CREATE_INVENTORY_INIT,
  CreateInventoryDone,
  CreateInventoryInit,
  DELETE_INVENTORY_INIT,
  DeleteInventoryDone,
  DeleteInventoryInit, EDIT_INVENTORY_INIT, EditInventoryDone, EditInventoryInit,
  FETCH_INVENTORY_INIT,
  FetchInventoryDone,
  FetchInventoryInit,
  GET_INVENTORIES_INIT,
  GetInventoriesDone,
  GetInventoriesInit
} from '@app/app/inventory/state/inventory.actions';
import {map, switchMap} from 'rxjs/operators';
import {InventoryService} from '@app/app/inventory/inventory.service';
import {Inventory} from '@app/app/_interfaces/Inventory.interface';
import {INVResponse} from '@app/app/_interfaces/INVResponse.interface';

@Injectable()
export class InventoryEffects {
  constructor(private action$: Actions, private invService: InventoryService) {
  }

  @Effect()
  public initGetInventoriesEffect$ = this.action$.pipe(
    ofType(GET_INVENTORIES_INIT),
    switchMap((action: GetInventoriesInit) =>
      this.invService.getInventories()
        .pipe(map((res: Array<Inventory>) => new GetInventoriesDone(res)))
    ));

  @Effect()
  public createInventoryEffect$ = this.action$.pipe(
    ofType(CREATE_INVENTORY_INIT),
    switchMap((action: CreateInventoryInit) => this.invService.createInventory(action.payload)
      .pipe(map((res: INVResponse) => new CreateInventoryDone(res)))
    ));

  @Effect()
  public fetchInventoryDetailsEffect$ = this.action$.pipe(
    ofType(FETCH_INVENTORY_INIT),
    switchMap((action: FetchInventoryInit) => this.invService.getInventoryDetailsByID(action.payload)
      .pipe(map((res: Inventory) => new FetchInventoryDone(res)))
    ));

  @Effect()
  public deleteInventoryEffect$ = this.action$.pipe(
    ofType(DELETE_INVENTORY_INIT),
    switchMap((action: DeleteInventoryInit) => this.invService.deleteInventory(action.payload)
      .pipe(map((res: INVResponse) => new DeleteInventoryDone(res)))
    ));

  @Effect()
  public editInventoryEffect$ = this.action$.pipe(
    ofType(EDIT_INVENTORY_INIT),
    switchMap((action: EditInventoryInit) => this.invService.updateInventory(action.payload)
      .pipe(map((res: INVResponse) => new EditInventoryDone(res)))
    ));
}
