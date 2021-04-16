import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from "@app/environments/environment";
import {Inventory} from "@app/app/_interfaces/Inventory.interface";
import {flatMap} from 'rxjs/operators';
import {INVResponse} from '@app/app/_interfaces/INVResponse.interface';
import {Observable, of} from 'rxjs';
import {User} from '@app/app/_interfaces/User.interface';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  inventoryURL = `${environment.baseURL}/inventory`;
  usersURL = `${environment.baseURL}/user`;

  constructor(private http: HttpClient) {
  }

  getInventories() {
    return this.http.get(this.inventoryURL).pipe(
      flatMap((res: INVResponse) => of(res.data as Array<Inventory>))
    );
  }

  getInventoryDetailsByID(invID: number): Observable<Inventory> {
    return this.http.get(`${this.inventoryURL}/${invID}`).pipe(
      flatMap((res: INVResponse) => of(res.data as Inventory))
    );
  }

  createInventory(inv: Inventory) {
    return this.http.post(this.inventoryURL, inv);
  }

  updateInventory(inv: Inventory) {
    return this.http.put(`${this.inventoryURL}`, inv);
  }

  deleteInventory(invID: number) {
    return this.http.delete(`${this.inventoryURL}/${invID}`);
  }

  // region Bulk Inv ops
  createBulkInventories(inventories: Array<Inventory>) {
    return this.http.post(`${this.inventoryURL}/bulk`, {inventories});
  }

  updateBulkInventories(inventories: Array<Inventory>) {
    return this.http.put(`${this.inventoryURL}/bulk`, {inventories});
  }

  deleteBulkInventories(invIDs: string) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {invIDs},
    };
    return this.http.delete(`${this.inventoryURL}/bulk`, options);
  }

  // endregion

  searchUsers(keyword: string) {
    return this.http.get(`${this.usersURL}?q=${keyword}`).pipe(
      flatMap((res: INVResponse) => of(res.data as Array<User>))
    );
  }


}
