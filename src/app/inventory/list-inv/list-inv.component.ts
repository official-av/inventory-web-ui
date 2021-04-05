import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Inventory} from '@app/app/_interfaces/Inventory.interface';
import {Observable} from 'rxjs';
import {State} from '@app/app/_interfaces/State.interface';
import {select, Store} from '@ngrx/store';
import {GetInventoriesInit} from '@app/app/inventory/state/inventory.actions';
import {selectListInventoryState} from '@app/app/inventory/state/inventory.state';

@Component({
  selector: 'app-inventory',
  templateUrl: './list-inv.component.html',
  styleUrls: ['./list-inv.component.scss']
})
export class ListInvComponent implements OnInit {
  inventoriesData$: Observable<Array<Inventory>>;
  columnDefs = [
    {field: 'id', width: 150},
    {field: 'name', sortable: true, filter: true},
    {field: 'weight', sortable: true, filter: true},
    {field: 'price', sortable: true, filter: true},
  ];

  constructor(private store: Store<State>,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.fetchInventories();
  }

  ngOnInit(): void {
    this.inventoriesData$ = this.store.pipe(select(selectListInventoryState));
  }

  fetchInventories() {
    this.store.dispatch(new GetInventoriesInit());
  }

  create() {
    this.router.navigate(['create'], {relativeTo: this.activatedRoute});
  }

}
