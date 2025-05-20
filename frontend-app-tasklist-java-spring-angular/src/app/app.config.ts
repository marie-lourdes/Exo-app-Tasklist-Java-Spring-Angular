import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay, withIncrementalHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';
import { BASE_URL_API, URL_API } from '@environments/app.token';
import { PROVIDER_CORE_SERVICE,CORE_PROVIDERS } from '@app/core';
import { PROVIDER_SHARED_SERVICE, SHARED_PROVIDERS} from '@app/shared';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay(), withIncrementalHydration()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    { provide: BASE_URL_API, useValue: URL_API },
    { provide: PROVIDER_CORE_SERVICE, useValue: CORE_PROVIDERS },
    { provide: PROVIDER_SHARED_SERVICE, useValue: SHARED_PROVIDERS },
  ],
};
