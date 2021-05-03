import {Component, OnInit} from '@angular/core';
import {SharedService} from '@app/app/shared/shared.service';
import {User} from '@app/app/_interfaces/User.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  currentYear = new Date().getFullYear().toString();
  userDetails: User;

  constructor(public shared: SharedService) {
    shared.userDetailsSubject$.subscribe((val:User) => {
      console.log(val);
      this.userDetails = val;
    });
  }

  ngOnInit(): void {
  }

}
