import { Injectable } from '@angular/core'
import { ITask} from '../../../model/itask.interface';
import { TaskStatus} from '../../../enums/task-status.enum';
import { ITaskSortingStrategy  } from '../interfaces/itask-sorting-strategy.interface';

@Injectable({
  providedIn: 'root'  // Important !
})
export class PendingTasksStrategy implements ITaskSortingStrategy {
  sort(tasks: ITask[]): ITask[] {
    return tasks.filter( task => task.status === TaskStatus.PENDING );
    }
}
