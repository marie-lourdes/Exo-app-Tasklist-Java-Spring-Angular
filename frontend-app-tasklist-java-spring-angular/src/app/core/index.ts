// core/index.ts regroupe les service utlisés par les composants et facilite l import
export * from './http/services/api-task.service';
export * from './services/task.service';
export * from './components/header/header.component';
export * from './http/interfaces/icrudoperation.interface';

import { ApiTaskService } from './http/services/api-task.service';
import { TaskService } from './services/task.service';
import { Provider } from '@angular/core';
