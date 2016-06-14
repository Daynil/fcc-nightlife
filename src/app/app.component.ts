import { Component } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';

import { ResultListComponent } from './search-results/result-list/result-list.component';

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  directives: [ResultListComponent],
  providers: HTTP_PROVIDERS
})
export class AppComponent {
  
  constructor() { }

}