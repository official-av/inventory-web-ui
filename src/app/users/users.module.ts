import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersListComponent} from './users/users-list.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {SharedModule} from '@app/app/shared/shared.module';
import {UsersComponent} from '@app/app/users/users.component';


@NgModule({
  declarations: [UsersComponent, UsersListComponent, CreateUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule {
}
