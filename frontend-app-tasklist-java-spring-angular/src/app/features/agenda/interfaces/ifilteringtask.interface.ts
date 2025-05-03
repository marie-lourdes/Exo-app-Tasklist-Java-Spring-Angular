import { Task } from '@app/shared';
import { Signal } from '@angular/core';

export interface IFilteringTask {
  getTasksByDate(date: string | null): Signal<Task[]>;
  groupedTasksByDate(): Signal<Map<string, Task[]>>
}
