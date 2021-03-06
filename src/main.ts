import { enableProdMode } from "@angular/core";
import { bootstrap }    from '@angular/platform-browser-dynamic';

import { AppComponent } from './app/app.component';

enableProdMode();

bootstrap(AppComponent)
  .catch(error => console.log(error));