import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient,withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay,withIncrementalHydration } from '@angular/platform-browser';
import { provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { TaskService } from './core/services/task.service';
import {BASE_URL_API,URL_API} from '../environments/app.token';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay(),
    withIncrementalHydration()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    { provide: BASE_URL_API, useValue:URL_API },
    TaskService
    ]
  }
