// core/index.ts
export * from './services/api-task.service';
export * from './services/task.service';
export * from './components/header/header.component';

//header n est pas un service donc pas ds un provider
export const CORE_PROVIDERS = [
  ApiTaskService,
  TaskService,
] as const;
