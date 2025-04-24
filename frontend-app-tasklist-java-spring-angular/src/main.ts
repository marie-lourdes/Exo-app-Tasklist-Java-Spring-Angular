import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import {  provideAppInitializer,inject } from '@angular/core';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

/*  ancienne implementation avec AppModule:
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));*/
