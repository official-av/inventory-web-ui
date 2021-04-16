import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout/layout.component';
import {ClarityModule} from '@clr/angular';
import {FlexLayoutModule} from '@angular/flex-layout';
import {RouterModule} from '@angular/router';
import {SharedService} from '@app/app/shared/shared.service';
import {AgGridModule} from 'ag-grid-angular';
import {ReactiveFormsModule} from '@angular/forms';
import {AGGridTemplateRendererComponent} from '@app/app/shared/agGridTemplateRenderer/ag-grid-template-renderer.component';
import { BreadcrumbsComponent } from './layout/breadcrumbs/breadcrumbs.component';
import {XlsxReaderComponent} from '@app/app/shared/xlsx-reader/xlsx-reader.component';


@NgModule({
  declarations: [
    LayoutComponent,
    AGGridTemplateRendererComponent,
    BreadcrumbsComponent,
    XlsxReaderComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    FlexLayoutModule,
    RouterModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([AGGridTemplateRendererComponent])
  ],
  exports: [
    LayoutComponent,
    AGGridTemplateRendererComponent,
    XlsxReaderComponent,
    FlexLayoutModule,
    ClarityModule,
    ReactiveFormsModule,
    AgGridModule
  ],
  providers: [SharedService]
})
export class SharedModule {
}
