import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {InventoryRoutingModule} from './inventory-routing.module';
import {SharedModule} from "@app/app/shared/shared.module";
import {InventoryService} from "@app/app/inventory/inventory.service";
import {CreateInvComponent} from './create-inv/create-inv.component';
import {InventoryComponent} from "@app/app/inventory/inventory.component";
import {ListInvComponent} from "@app/app/inventory/list-inv/list-inv.component";


@NgModule({
  declarations: [InventoryComponent, CreateInvComponent, ListInvComponent],
  imports: [
    CommonModule,
    SharedModule,
    InventoryRoutingModule
  ],
  providers: [InventoryService]
})
export class InventoryModule {
}
