import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Inventory} from '@app/app/_interfaces/Inventory.interface';
import {Observable} from 'rxjs';
import {State} from '@app/app/_interfaces/State.interface';
import {select, Store} from '@ngrx/store';
import {
  DELETE_INVENTORY_DONE,
  DeleteInventoryInit,
  GetInventoriesInit
} from '@app/app/inventory/state/inventory.actions';
import {selectListInventoryState} from '@app/app/inventory/state/inventory.state';
import {AGGridTemplateRendererComponent} from '@app/app/shared/agGridTemplateRenderer/ag-grid-template-renderer.component';
import {Actions, ofType} from '@ngrx/effects';
import {SharedService} from '@app/app/shared/shared.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './list-inv.component.html',
  styleUrls: ['./list-inv.component.scss']
})
export class ListInvComponent implements OnInit, AfterViewInit {
  inventoriesData$: Observable<Array<Inventory>>;
  @ViewChild('gridActionsColumn') gridActionsColumn: TemplateRef<any>;
  columnDefs: Array<any>;

  constructor(private store: Store<State>,
              private action$: Actions,
              private router: Router,
              public sharedService: SharedService,
              private activatedRoute: ActivatedRoute) {
    this.fetchInventories();
    this.action$.pipe(
      ofType(DELETE_INVENTORY_DONE)
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

}
