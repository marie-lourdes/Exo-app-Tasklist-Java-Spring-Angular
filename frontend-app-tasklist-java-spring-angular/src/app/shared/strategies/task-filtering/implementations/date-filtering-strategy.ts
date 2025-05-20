import {ItaskFilteringStrategy } from  '../interfaces/itask-filtering-strategy.interface'
export class DateFilteringStrategy implements ItaskFilteringStrategy  {
  filter(tasks: ITask[], date: string): ITask[] {
    return tasks.filter( task => task.date === date);
    }

}
