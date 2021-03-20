import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from '../layout/layout.component';
import {ClarityModule} from '@clr/angular';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    FlexLayoutModule
  ],
  exports: [
    LayoutComponent,
    FlexLayoutModule
  ]
})
export class SharedModule {
}
