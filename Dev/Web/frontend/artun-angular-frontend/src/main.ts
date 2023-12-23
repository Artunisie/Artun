/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';

import { AppModule } from './app/app.module';
declare var $: any;


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

