import { ITask } from '@app/shared';
import { Signal } from '@angular/core';

export interface IFilteringTask {
  getTasksByDate(date: string | null): Signal<ITask[]>;
  groupedTasksByDate(): Signal<Map<string, ITask[]>>
}
