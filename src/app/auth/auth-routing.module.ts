import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from '@app/app/auth/login/login.component';
import {AuthService} from "@app/app/auth/auth.service";

const routes: Routes = [
  {
    path: '', redirectTo: 'login'
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthService]
})
export class AuthRoutingModule {
}
