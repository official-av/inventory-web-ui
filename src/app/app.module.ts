import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SharedModule} from './shared/shared.module';
import {ToastrModule} from 'ngx-toastr';
import {NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule} from "ngx-ui-loader";
import {AuthGuard} from '@app/app/auth.guard';
import {UsersModule} from './users/users.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppInterceptor} from '@app/app/app.interceptor';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {effects, initialState, reducers} from '@app/app/app.state';

const ngxLoaderConfiguration =
  {
    bgsColor: "#03dac5",
    bgsOpacity: 0.8,
    bgsPosition: "bottom-right",
    bgsSize: 60,
    bgsType: "ball-scale-multiple",
    blur: 5,
    delay: 0,
    fastFadeOut: true,
    fgsColor: "red",
    fgsPosition: "center-center",
    fgsSize: 60,
    fgsType: "ball-spin-clockwise",
    gap: 24,
    logoPosition: "center-center",
    logoSize: 120,
    logoUrl: "",
    masterLoaderId: "master",
    overlayBorderRadius: "0",
    overlayColor: "rgba(40, 40, 40, 0.8)",
    pbColor: "red",
    pbDirection: "ltr",
    pbThickness: 6,
    hasProgressBar: true,
    text: "",
    textColor: "#FFFFFF",
    textPosition: "center-center",
    maxTime: -1,
    minTime: 300
  } as NgxUiLoaderConfig;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true
    }),
    StoreModule.forRoot(reducers, {initialState}),
    EffectsModule.forRoot(effects),
    UsersModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxLoaderConfiguration),
    NgxUiLoaderHttpModule
  ],
  providers: [
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
