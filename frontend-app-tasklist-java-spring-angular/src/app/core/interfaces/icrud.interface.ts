export interface ICrudService {
   createTask(task: Task): void;
   updateTask(task: Task, onComplete: () => void): void;
   deleteTask(id: number): void;
   getTasks(): WritableSignal<Task[]>;

}
