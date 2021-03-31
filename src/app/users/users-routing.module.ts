import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UsersListComponent} from '@app/app/users/users/users-list.component';
import {CreateUserComponent} from '@app/app/users/create-user/create-user.component';
import {UsersComponent} from '@app/app/users/users.component';

const routes: Routes = [
  {
    path: '', component: UsersComponent, children: [
      {path: '', component: UsersListComponent},
      {path: 'create', component: CreateUserComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
