import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  currentYear = new Date().getFullYear().toString();

  constructor() {
  }

  ngOnInit(): void {
  }

}
