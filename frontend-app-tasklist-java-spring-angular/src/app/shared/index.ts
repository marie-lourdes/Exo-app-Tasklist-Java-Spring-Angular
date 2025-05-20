// shared/index.ts
export * from './components/load-spinner/load-spinner.component';
export * from './model/itask.interface';
export * from './enums/task-status.enum';

//strategies
export * from './strategies/task-sorting/interfaces/itask-sorting-strategy.interface';
export * from './strategies/task-sorting/implementations/completed-tasks-strategy';
export * from './strategies/task-sorting/implementations/pending-tasks-strategy';

//services
export * from './services/task-filter.service';

//PROVIDERS
import {TaskFilterService} from './services/task-filter.service';
import { InjectionToken } from '@angular/core';
import { Provider } from '@angular/core';
export const PROVIDER_SHARED_SERVICE = new InjectionToken<Provider[]>('PROVIDER_SHARED_SERVICE');
export const SHARED_PROVIDERS: Provider[] = [
 TaskFilterService
];


