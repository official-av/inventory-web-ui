import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  columnDefs = [
    {field: 'id', width: 150},
    {field: 'fname', headerName: 'First Name', sortable: true, filter: true},
    {field: 'lname', headerName: 'Last Name', sortable: true, filter: true},
    {field: 'email', sortable: true, filter: true},
    {field: 'contact'},
    // {field: 'createdAt'},
  ];

  rowData = [
    {fname: 'Anmol', lname: 'Vashistha', email: 'av@gmail.com', contact: '8899889988', id: 1},
    {fname: 'John', lname: 'Doe', email: 'johndoe@gmail.com', contact: '7755775577', id: 2},
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
