import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay,withIncrementalHydration } from '@angular/platform-browser';
import { routes } from './app.routes';
import { TaskService } from './service/task.service';
import {BASE_URL_API} from '../environments/app.token';

//retrait du fichier  app module et l'import  HttpClientModule, BrowserModule  et ajout du provideHttpClient dans app config
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay(),
    withIncrementalHydration()),
    provideHttpClient(withFetch()),
    { provide: 'URL_API', useValue:  BASE_URL_API },
    TaskService
    ]
  }
