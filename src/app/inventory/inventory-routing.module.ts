import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateInvComponent} from '@app/app/inventory/create-inv/create-inv.component';
import {ListInvComponent} from '@app/app/inventory/list-inv/list-inv.component';
import {InventoryComponent} from '@app/app/inventory/inventory.component';
import {AdminGuard} from '@app/app/admin.guard';

const routes: Routes = [
  {
    path: '', component: InventoryComponent, children: [
      {path: '', component: ListInvComponent},
      {path: 'create', component: CreateInvComponent, canActivate: [AdminGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule {
}
