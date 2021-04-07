import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InventoryRoutingModule} from './inventory-routing.module';
import {SharedModule} from "@app/app/shared/shared.module";
import {InventoryService} from "@app/app/inventory/inventory.service";
import {CreateInvComponent} from './create-inv/create-inv.component';
import {InventoryComponent} from "@app/app/inventory/inventory.component";
import {ListInvComponent} from "@app/app/inventory/list-inv/list-inv.component";
import {inventoryReducers} from '@app/app/inventory/state/inventory.reducers';
import {inventoryEffectsArr} from '@app/app/inventory/state/inventory.state';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {ReactiveFormsModule} from '@angular/forms';
import {TagInputModule} from 'ngx-chips';


@NgModule({
  declarations: [InventoryComponent, CreateInvComponent, ListInvComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    TagInputModule,
    InventoryRoutingModule,
    StoreModule.forFeature('inventoryState', inventoryReducers),
    EffectsModule.forFeature(inventoryEffectsArr)
  ],
  providers: [InventoryService]
})
export class InventoryModule {
}
