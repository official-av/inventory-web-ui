import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs/operators';
import {InventoryService} from '@app/app/inventory/inventory.service';
import {Actions, ofType} from '@ngrx/effects';
import {
  CREATE_INVENTORY_DONE,
  CreateInventoryInit,
  UpdateCreateInventory
} from '@app/app/inventory/state/inventory.actions';
import {State} from '@app/app/_interfaces/State.interface';
import {select, Store} from '@ngrx/store';
import {Inventory} from '@app/app/_interfaces/Inventory.interface';
import {Observable} from 'rxjs';
import {selectCreateInventoryState} from '@app/app/inventory/state/inventory.state';

@Component({
  selector: 'app-create-inv',
  templateUrl: './create-inv.component.html',
  styleUrls: ['./create-inv.component.scss']
})
export class CreateInvComponent implements OnInit {
  formData$: Observable<Inventory>;
  invForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    price: new FormControl(0, [Validators.required]),
    weight: new FormControl('', [Validators.required, Validators.maxLength(100)]),
    users: new FormControl([])
  });
  searchedUsers$ = this.invForm.get('users').valueChanges.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(val => val && val.length > 2),
    switchMap(val => this.invService.searchUsers(val))
  );

  constructor(private store: Store<State>, private action$: Actions, private invService: InventoryService) {
    this.action$.pipe(
      ofType(CREATE_INVENTORY_DONE)
    ).subscribe(val => this.resetForm());
  }

  ngOnInit(): void {
    this.formData$ = this.store.pipe(select(selectCreateInventoryState));
    this.formData$.subscribe((val: Inventory) => this.fillFormFromValues(val));
  }

  private fillFormFromValues(inv: Inventory) {
    console.log(inv);
    if (inv && Object.keys(inv).length > 0) {
      this.invForm.setValue(inv);
    }
  }

  private resetForm() {
    this.invForm.reset();
    this.store.dispatch(new UpdateCreateInventory({} as Inventory));
  }

  public doSubmit() {
    const inv = this.invForm.value as Inventory;
    this.store.dispatch(new UpdateCreateInventory(inv));
    this.store.dispatch(new CreateInventoryInit(inv));
  }

}
