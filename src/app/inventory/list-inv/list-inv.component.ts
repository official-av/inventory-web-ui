import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Inventory} from '@app/app/_interfaces/Inventory.interface';
import {Observable} from 'rxjs';
import {State} from '@app/app/_interfaces/State.interface';
import {select, Store} from '@ngrx/store';
import {
  BULK_CREATE_INVENTORY_DONE,
  BULK_UPDATE_INVENTORY_DONE,
  BulkCreateInventoryInit,
  BulkUpdateInventoryInit,
  DELETE_INVENTORY_DONE,
  DeleteInventoryInit,
  GetInventoriesInit
} from '@app/app/inventory/state/inventory.actions';
import {selectListInventoryState} from '@app/app/inventory/state/inventory.state';
import {AGGridTemplateRendererComponent} from '@app/app/shared/agGridTemplateRenderer/ag-grid-template-renderer.component';
import {Actions, ofType} from '@ngrx/effects';
import {SharedService} from '@app/app/shared/shared.service';
import {ToastrService} from 'ngx-toastr';
import {XlsxReaderComponent} from '@app/app/shared/xlsx-reader/xlsx-reader.component';

@Component({
  selector: 'app-inventory',
  templateUrl: './list-inv.component.html',
  styleUrls: ['./list-inv.component.scss']
})
export class ListInvComponent implements OnInit, AfterViewInit {
  inventoriesData$: Observable<Array<Inventory>>;
  @ViewChild('gridActionsColumn') gridActionsColumn: TemplateRef<any>;
  columnDefs: Array<any>;
  isBulkCreateModalOpen = false;
  isBulkUpdateModalOpen = false;
  xlsxFile = null;
  private invCreateXLSXHeaders = ['name', 'weight', 'price', 'users'];
  private invUpdateXLSXHeaders = ['id', 'name', 'weight', 'price', 'users'];
  inventoriesForUpload = [] as Array<Inventory>;
  @ViewChild('xlsx') xlsxComponent: XlsxReaderComponent;

  constructor(private store: Store<State>,
              private action$: Actions,
              private router: Router,
              public sharedService: SharedService,
              private activatedRoute: ActivatedRoute,
              private toastr: ToastrService) {
    this.fetchInventories();
    this.action$.pipe(
      ofType(DELETE_INVENTORY_DONE, BULK_CREATE_INVENTORY_DONE, BULK_UPDATE_INVENTORY_DONE)
    ).subscribe(val => this.fetchInventories());
  }

  ngOnInit(): void {
    this.inventoriesData$ = this.store.pipe(select(selectListInventoryState));
  }

  ngAfterViewInit() {
    this.columnDefs = [
      {field: 'id', width: 150},
      {field: 'name', sortable: true, filter: true},
      {field: 'weight', sortable: true, filter: true},
      {field: 'price', sortable: true, filter: true},
      {
        field: 'actions',
        cellRendererFramework: AGGridTemplateRendererComponent,
        cellRendererParams: {
          ngTemplate: this.gridActionsColumn
        },
        minWidth: 150,
      }
    ];
  }

  fetchInventories() {
    this.store.dispatch(new GetInventoriesInit());
  }

  create() {
    this.router.navigate(['create'], {relativeTo: this.activatedRoute});
  }

  edit(event) {
    console.log(event);
    this.router.navigate([`update/${event.id}`], {relativeTo: this.activatedRoute});
  }

  delete(event) {
    this.store.dispatch(new DeleteInventoryInit(event.id));
  }

  processXlsxData(operation, event) {
    const xlsxData = event.data as string[][];
    if (xlsxData.length > 1) {
      const headers = event.data[0];
      const invDataArr = event.data.slice(1);
      const errorMsg = this.parseInventoriesFromXLSX(operation, headers, invDataArr);
      if (errorMsg) {
        this.toastr.error(errorMsg);
      }
    }
  }

  uploadBulkInventoryData(operation) {
    if (this.inventoriesForUpload && this.inventoriesForUpload.length > 0) {
      // upload data action
      if (operation === 'create') {
        this.store.dispatch(new BulkCreateInventoryInit(this.inventoriesForUpload));
      } else {
        // update
        this.store.dispatch(new BulkUpdateInventoryInit(this.inventoriesForUpload));
      }
    }
    this.resetXLSX();
  }

  private parseInventoriesFromXLSX(operation: string, headers: Array<string>, dataArr: string[][]) {
    try {
      const headerCount = operation === 'create' ? 4 : 5;
      const inventories = [] as Array<Inventory>;
      // validate headers
      const headersInvalid = !this.invCreateXLSXHeaders.every(x => headers.some(y => y.toLowerCase() === x.toLowerCase()));
      if (headersInvalid) {
        return operation === 'create'
          ? 'Invalid Headers - Please include Name,Weight,Price and Users headers in same order!'
          : 'Invalid Headers - Please include ID,Name,Weight,Price and Users headers in same order!';
      }
      // parse inventories
      dataArr.forEach((x: string[], index) => {
        if (x.length < headerCount) {
          throw new Error(`for row ${index + 2}`);
        }
        const inv = {} as Inventory;
        if (operation === 'update') { // for update only
          inv.id = Number(x[0]);
          if (isNaN(inv.id)) {
            throw new Error(`Invalid ID ${x[0]} for row ${index + 2}`);
          }
        }
        inv.name = x[1];
        inv.weight = x[2].toString();
        inv.price = Number(x[3]);
        if (isNaN(inv.price)) {
          throw new Error(`Invalid price ${x[3]} for row ${index + 2}`);
        }
        inv.users = Array.from(x[4].toString().split(','), userID => {
          const id = Number(userID);
          if (isNaN(id)) {
            throw new Error(`Invalid users ${x[4]} for row ${index + 2}`);
          }
          return {id};
        });
        inventories.push(inv);
      });
      this.inventoriesForUpload = inventories;
      console.log(inventories);
    } catch (e) {
      return `Invalid Data: ${e.message}`;
    }
  }

  resetXLSX() {
    this.xlsxComponent.reset();
    this.isBulkCreateModalOpen = false;
    this.isBulkUpdateModalOpen = false;
    this.xlsxFile = null;
    this.inventoriesForUpload = [] as Array<Inventory>;
  }

}
