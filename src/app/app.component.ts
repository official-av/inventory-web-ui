import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {SharedService} from './shared/shared.service';
import '@cds/core/icon/register.js';
import {ClarityIcons, pencilIcon, trashIcon, userIcon} from '@cds/core/icon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private router: Router, private shared: SharedService) {
    ClarityIcons.addIcons(userIcon, pencilIcon, trashIcon);
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.shared.curModule = this.router.url.split('/')[1];
    });
  }
}
