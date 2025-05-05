// core/index.ts regroupe les service utlisés par les composants et facilite l import

// Services
export * from './http/services/api-task.service';
export * from './services/task.service';

// Components
export * from './components/header/header.component';

// Interfaces
export * from './http/interfaces/icrudoperation.interface';


// Providers
import { ApiTaskService } from './http/services/api-task.service';
import { TaskService } from './services/task.service';
import { InjectionToken } from '@angular/core';
import { Provider } from '@angular/core';

export const PROVIDER_SERVICE = new InjectionToken<Provider[]>('PROVIDER_SERVICE');
export const CORE_PROVIDERS: Provider[] = [
  ApiTaskService,
  TaskService
];

