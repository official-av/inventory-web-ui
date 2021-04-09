import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, flatMap} from 'rxjs/operators';
import {InventoryService} from '@app/app/inventory/inventory.service';
import {Actions, ofType} from '@ngrx/effects';
import {
  CREATE_INVENTORY_DONE,
  CreateInventoryInit,
  EDIT_INVENTORY_DONE,
  EditInventoryInit,
  FetchInventoryInit,
  UpdateCreateInventory
} from '@app/app/inventory/state/inventory.actions';
import {State} from '@app/app/_interfaces/State.interface';
import {select, Store} from '@ngrx/store';
import {Inventory} from '@app/app/_interfaces/Inventory.interface';
import {Observable, of} from 'rxjs';
import {selectCreateInventoryState} from '@app/app/inventory/state/inventory.state';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-create-inv',
  templateUrl: './create-inv.component.html',
  styleUrls: ['./create-inv.component.scss']
})
export class CreateInvComponent implements OnInit {
  isUpdateMode = false;
  formData$: Observable<Inventory>;
  invForm = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    price: new FormControl(0, [Validators.required]),
    weight: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    users: new FormControl([], [Validators.required])
  });
  searchUsers$ = (text: string): Observable<any> => {
    return of(text).pipe(
      filter(val => val.trim() !== '' && val.trim().length >= 2),
      debounceTime(200),
      distinctUntilChanged(),
      flatMap(val => this.invService.searchUsers(val)));
  }

  constructor(private store: Store<State>,
              private action$: Actions,
              private router: Router,
              private invService: InventoryService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(
      params => {
        if (params.id) {
          this.isUpdateMode = true;
          this.store.dispatch(new FetchInventoryInit(params.id));
        } else {
          this.isUpdateMode = false;
        }
      }
    );
    this.action$.pipe(
      ofType(CREATE_INVENTORY_DONE, EDIT_INVENTORY_DONE)
    ).subscribe(val => this.resetForm());
  }

  ngOnInit(): void {
    this.formData$ = this.store.pipe(select(selectCreateInventoryState));
    this.formData$.subscribe((val: Inventory) => this.fillFormFromValues(val));
  }

  private fillFormFromValues(inv: Inventory) {
    if (inv && Object.keys(inv).length > 0) {
      this.invForm.setValue(inv);
    }
  }

  private resetForm() {
    this.invForm.reset();
    this.store.dispatch(new UpdateCreateInventory({} as Inventory));
    this.router.navigate(['inventory']);
  }

  public doSubmit() {
    const inv = this.invForm.value as Inventory;
    this.store.dispatch(new UpdateCreateInventory(inv));
    inv.id ? this.store.dispatch(new EditInventoryInit(inv)) : this.store.dispatch(new CreateInventoryInit(inv));
  }

}
