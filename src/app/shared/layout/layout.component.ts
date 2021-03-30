import {Component, OnInit} from '@angular/core';
import {SharedService} from "@app/app/shared/shared.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  currentYear = new Date().getFullYear().toString();

  constructor(public shared: SharedService) {
  }

  ngOnInit(): void {
  }

}
