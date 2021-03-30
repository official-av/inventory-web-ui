import {Component, OnInit} from '@angular/core';
import {InventoryService} from "@app/app/inventory/inventory.service";
import {ToastrService} from 'ngx-toastr';
import {INVResponse} from "@app/app/_interfaces/INVResponse.interface";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-inventory',
  templateUrl: './list-inv.component.html',
  styleUrls: ['./list-inv.component.scss']
})
export class ListInvComponent implements OnInit {
  columnDefs = [
    {field: 'id'},
    {field: 'name', sortable: true, filter: true},
    {field: 'weight', sortable: true, filter: true},
    {field: 'price', sortable: true, filter: true},
  ];

  rowData = [
    {name: 'Maggi', weight: '200g', price: 12, id: 1},
    {name: 'Maggi 2', weight: '200g', price: 12, id: 2},
    {name: 'Maggi 3', weight: '200g', price: 12, id: 3}
  ];

  constructor(private inventoryService: InventoryService,
              private toast: ToastrService,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
    this.fetchInventories();
  }

  ngOnInit(): void {
  }

  fetchInventories() {
    this.inventoryService.getInventories().subscribe((res: INVResponse) => {
      console.log(res);
      this.rowData = res.data;
      this.toast.success(res.message);
    }, err => this.toast.error(err.message));

  }

  create() {
    this.router.navigate(['create'], {relativeTo: this.activatedRoute});
  }

}
