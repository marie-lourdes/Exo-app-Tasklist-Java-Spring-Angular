import { ITask } from '@app/shared';
import { Signal } from '@angular/core';

export interface IFilteringDateTask {
  getTasksByDate(date: string | null): Signal<ITask[]>;
  groupedTasksByDate(): Signal<Map<string, ITask[]>>
}
