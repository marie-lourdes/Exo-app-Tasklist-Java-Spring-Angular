// core/index.ts
export * from './services/api-task.service';
export * from './services/task.service';
export * from './components/header/header.component';

import { ApiTaskService } from './services/api-task.service';
import { TaskService } from './services/task.service';

//header n est pas un service donc pas ds un provider
export const CORE_PROVIDERS = [
  ApiTaskService,
  TaskService,
] as const;
