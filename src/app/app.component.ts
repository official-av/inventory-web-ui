import {Component} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';
import {SharedService} from './shared/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'algo-inventory-webUI';

  constructor(private router: Router, private shared: SharedService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.shared.curModule = this.router.url.split('/')[1];
    });
  }
}
