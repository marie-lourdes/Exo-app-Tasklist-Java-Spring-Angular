import { Injectable } from '@angular/core';
import { ITask, TaskStatus} from '@app/shared';
import { ITaskSortingStrategy  } from './itask-sorting-strategy.interface';

@Injectable({
  providedIn: 'root'  // Important !
})
export class CompletedTasksStrategy implements  ITaskSortingStrategy  {
  sort(tasks: ITask[]): ITask[] {
      return tasks.filter( task => task.status === TaskStatus.COMPLETED );
      }
}
