import { ITask } from '@app/shared';

export interface ITaskSortingStrategy {
   sort(tasks: ITask[]): ITask[];
}
