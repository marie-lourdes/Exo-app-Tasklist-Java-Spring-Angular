import { Injectable } from '@angular/core';
import {ItaskFilteringStrategy } from  '../interfaces/itask-filtering-strategy.interface';
import { ITask} from '../../../model/itask.interface';

@Injectable({
  providedIn: 'root'  // Important pour l injection ds le provider de app.config et en tant que dependance de taskFilterService , la gestion de dependance est gere par angular avec @Injectable !
})
export class DateFilteringStrategy implements ItaskFilteringStrategy  {
  filter(tasks: ITask[], date: string): ITask[] {
    return tasks.filter( task => task.date === date);
    }

}
