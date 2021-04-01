import {Component, OnInit} from '@angular/core';
import {User} from '@app/app/_interfaces/User.interface';
import {Observable} from 'rxjs';
import {State} from '@app/app/_interfaces/State.interface';
import {select, Store} from '@ngrx/store';
import {InitiateGetUsers} from '@app/app/users/state/users.actions';
import {selectUsersListState} from '@app/app/users/state/users.state';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {
  usersData$: Observable<Array<User>>;
  columnDefs = [
    {field: 'id', width: 150},
    {field: 'fname', headerName: 'First Name', sortable: true, filter: true},
    {field: 'lname', headerName: 'Last Name', sortable: true, filter: true},
    {field: 'email', sortable: true, filter: true},
    {field: 'contact'},
    // {field: 'createdAt'},
  ];

  constructor(private store: Store<State>) {
    this.store.dispatch(new InitiateGetUsers(null));
  }

  ngOnInit(): void {
    this.usersData$ = this.store.pipe(select(selectUsersListState));
  }

}
