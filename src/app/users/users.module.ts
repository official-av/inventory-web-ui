import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UsersListComponent} from './users/users-list.component';
import {CreateUserComponent} from './create-user/create-user.component';
import {SharedModule} from '@app/app/shared/shared.module';
import {UsersComponent} from '@app/app/users/users.component';
import {UserService} from '@app/app/users/user.service';
import {StoreModule} from '@ngrx/store';
import {usersReducer} from '@app/app/users/state/users.reducers';
import {EffectsModule} from '@ngrx/effects';
import {usersEffectsArr} from '@app/app/users/state/users.state';


@NgModule({
  declarations: [UsersComponent, UsersListComponent, CreateUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    StoreModule.forFeature('userState', usersReducer),
    EffectsModule.forFeature(usersEffectsArr)
  ],
  providers: [UserService]
})
export class UsersModule {
}
