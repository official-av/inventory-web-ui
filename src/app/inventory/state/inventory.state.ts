import {createSelector} from "@ngrx/store";
import {selectInventoryState} from '@app/app/app.state';
import {InventoryState} from '@app/app/_interfaces/InventoryState.interface';
import {InventoryEffects} from '@app/app/inventory/state/inventory.effects';

export const selectListInventoryState = createSelector(selectInventoryState, (s: InventoryState) => s.list);
export const selectCreateInventoryState = createSelector(selectInventoryState, (s: InventoryState) => s.create);
export const inventoryEffectsArr = [InventoryEffects];
