import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html'
})
export class BreadcrumbsComponent implements OnInit {
  public routesArr: Array<{ name: string, route: string }>;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)).subscribe(event => {
      this.routesArr = [] as Array<{ name: string, route: string }>;
      const routes = this.router.url.split('/');
      routes.splice(0, 1);
      routes.forEach((x: string, index: number) => this.routesArr.push({name: x, route: this.getRoute(routes, index)}));
    });
  }

  ngOnInit(): void {
  }

  public getRoute(routesArr: string[], index: number): string {
    let route = '';
    if (index === 0) {
      route = routesArr[0];
    } else {
      let i = 0;
      while (i <= index) {
        route += routesArr[i++] + '/';
      }
    }
    return route;
  }

}
