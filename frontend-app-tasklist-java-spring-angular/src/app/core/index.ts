// core/index.ts regroupe les service utlisés par les composants et facilite l import
export * from './services/api-task.service';
export * from './services/task.service';
export * from './components/header/header.component';

import { ApiTaskService } from './services/api-task.service';
import { TaskService } from './services/task.service';
import { Provider } from '@angular/core';
