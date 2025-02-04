import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay,withIncrementalHydration } from '@angular/platform-browser';
import { TaskService } from './service/task.service';

//retrait du fichier  app module et l'import  HttpClientModule, BrowserModule  et ajout du provideHttpClient dans app config
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay(),
    withIncrementalHydration()),
    provideHttpClient(withFetch()),
    TaskService
    ]
  }
