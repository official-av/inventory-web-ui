import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {ToastrModule} from 'ngx-toastr';
import {AuthGuard} from '@app/app/auth.guard';
import {UsersModule} from './users/users.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppInterceptor} from "@app/app/app.interceptor";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot(),
    UsersModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
