import { Observable } from 'rxjs';
import { ITask } from '@app/shared';

export interface ICrudService {
   createTask(task: ITask): Observable<ITask>;
   updateTask(task: ITask, onComplete: () => void): Observable<ITask>;
   deleteTask(id: number): Observable<void>;
   getTasks(): Observable<ITask[]> ;

}
