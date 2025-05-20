import { Injectable } from '@angular/core';

/* service qui centralise les filtrages des tâches
*/
@Injectable({
  providedIn: 'root'
})
export class TaskFilterService {

  constructor(
    private readonly completedTasksStrategy: CompletedTasksStrategy,
    private readonly pendingTasksStrategy: PendingTasksStrategy,
    private readonly dateFilteringStrategy: DateFilteringStrategy
    ) {}

  filterByStatus(tasks: ITask[], status: TaskStatus): ITask[] {
    return status === TaskStatus.COMPLETED
    ? this.completedTasksStrategy.sort(tasks)
    : this.pendingTasksStrategy.sort(tasks);
    }

  filterByDate(tasks: ITask[], date: string): ITask[] {
    return this.dateFilteringStrategy.filter(tasks, date);
    }
}
