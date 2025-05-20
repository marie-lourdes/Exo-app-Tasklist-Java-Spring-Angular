import { Observable } from 'rxjs';
import { ITask } from '@app/shared';

//TODO: Creer deux interfaces reader and writer qu heritera IcrudOperation
//et applique le PatterFacade et Segregation des Interfaces avec taskface qui cree selon le role indiqué une classe ou service
//qui implement IReader ou IWriter
export interface ICrudOperation{
   createTask(task: ITask): Observable<ITask>;
   updateTask(task: ITask, onComplete: () => void): Observable<ITask>;
   deleteTask(id: number): Observable<void>;
   getTasks(): Observable<ITask[]> ;

}
