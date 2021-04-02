import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {GET_INVENTORIES_INIT, GetInventoriesDone, GetInventoriesInit} from '@app/app/inventory/state/inventory.actions';
import {map, switchMap} from 'rxjs/operators';
import {InventoryService} from '@app/app/inventory/inventory.service';
import {Inventory} from '@app/app/_interfaces/Inventory.interface';

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
}
