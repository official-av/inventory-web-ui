import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from "@app/environments/environment";
import {Inventory} from "@app/app/_interfaces/Inventory.interface";
import {flatMap} from 'rxjs/operators';
import {INVResponse} from '@app/app/_interfaces/INVResponse.interface';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {
  inventoryURL = `${environment.baseURL}/inventory`;
  usersURL = `${environment.baseURL}/users`;

  constructor(private http: HttpClient) {
  }

  getInventories() {
    return this.http.get(this.inventoryURL).pipe(
      flatMap((res: INVResponse) => of(res.data as Array<Inventory>))
    );
  }

  createInventory(inv: Inventory) {
    return this.http.post(this.inventoryURL, inv);
  }

  updateInventory(inv: Inventory) {
    return this.http.put(`${this.inventoryURL}/${inv.id}`, inv);
  }

  deleteInventory(invID: number) {
    return this.http.delete(`${this.inventoryURL}/${invID}`);
  }

  // region TODO: Bulk Inv ops
  createBulkInventories() {
  }

  updateBulkInventories() {
  }

  deleteBulkInventories() {
  }

  searchUsers(keyword: string) {
    return this.http.get(`${this.usersURL}?q=${keyword}`);
  }

  // endregion

}
