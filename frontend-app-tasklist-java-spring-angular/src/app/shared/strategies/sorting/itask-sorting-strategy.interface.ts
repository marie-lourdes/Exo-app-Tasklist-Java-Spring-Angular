import { ITask } from '@app/shared';

export interface ITaskSortingStrategy {
   sort(tasks: Task[]): Task[];

}
