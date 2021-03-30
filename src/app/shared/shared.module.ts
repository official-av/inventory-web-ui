import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout/layout.component';
import {ClarityModule} from '@clr/angular';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {SharedService} from '@app/app/shared/shared.service';
import {AgGridModule} from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ClarityModule,
    FlexLayoutModule,
    RouterModule,
    AgGridModule
  ],
  exports: [
    HttpClientModule,
    LayoutComponent,
    FlexLayoutModule,
    ClarityModule,
    AgGridModule
  ],
  providers: [SharedService]
})
export class SharedModule {
}
