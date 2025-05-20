import {ItaskFilteringStrategy } from  '../interfaces/itask-filtering-strategy.interface';
import { ITask} from '../../../model/itask.interface';

export class DateFilteringStrategy implements ItaskFilteringStrategy  {
  filter(tasks: ITask[], date: string): ITask[] {
    return tasks.filter( task => task.date === date);
    }

}
