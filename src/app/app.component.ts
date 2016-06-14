import { Component } from '@angular/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from '@angular/router-deprecated';
import { HTTP_PROVIDERS } from '@angular/http';

import { AfterAuth } from './after-auth.component';
import { AuthService } from './auth.service';
import { ResultListComponent } from './search-results/result-list/result-list.component';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ResultListComponent, ROUTER_DIRECTIVES],
  providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, AuthService]
})
@RouteConfig([
  {
    path: '/after-auth',
    name: 'AfterAuth',
    component: AfterAuth
  }
])
export class AppComponent {
  
  constructor() { }

}