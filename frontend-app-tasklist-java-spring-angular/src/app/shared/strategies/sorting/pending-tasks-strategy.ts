import { ITask, TaskStatus} from '@app/shared';
import { ITaskSortingStrategy  } from './itask-sorting-strategy.interface';

export class PendingTasksStrategy implements ITaskSortingStrategy {
  sort(tasks: ITask[]): ITask[] {
    return tasks.filter( task => task.status === TaskStatus.PENDING );
    }
}
