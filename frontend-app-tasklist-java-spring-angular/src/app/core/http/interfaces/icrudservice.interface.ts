import { Observable } from 'rxjs';
import { Task } from '@app/shared';

export interface ICrudService {
   createTask(task: Task): Observable<Task>;
   updateTask(task: Task, onComplete: () => void): Observable<Task>;
   deleteTask(id: number): Observable<void>;
   getTasks(): Observable<Task[]> ;

}
