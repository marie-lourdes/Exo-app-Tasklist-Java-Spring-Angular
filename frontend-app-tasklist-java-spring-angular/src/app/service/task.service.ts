import { Injectable,OnInit,Inject,WritableSignal, signal, computed } from '@angular/core';
import {Observable, tap} from 'rxjs';
import { ApiTaskService } from './api-task.service';
import {  Task } from '../model/task';


/*1. **Gérer la logique métier des tâches** (organiser les tâches, grouper par date, gérer les `Signal` Angular).
  2. **Maintenir un état réactif** (via `WritableSignal` ou `ComputedSignal`).
*/
@Injectable({
  providedIn: 'root'
})
export class  TaskService {
  //TODO: decoupler les services avec la creation de Agenda service ,
  //TODO:deplacer les methodes et signaux liés au  taskbydate, taskbymonth dans agenda service dont dependra l'agendacomponent car tres fort couplage avec le taskservice

  // Signal contenant toutes les tâches
  private tasks: WritableSignal<Task[]> = signal([]);

  constructor(private apiTaskService: ApiTaskService) {
     this.loadTasks(); // Charger les tâches  à l initialisation
     }

  // Charger les tâches depuis le backend et les insérer dans le signal `tasks`
  loadTasks(): void {
    this.apiTaskService.getTasks().subscribe(
      (tasks) => {
        this.tasks.set(tasks);
        });
      }

  createTask(task: Task): void {
    this.apiTaskService.createTask(task).subscribe(
      (newTask) => {
        this.tasks.update((tasks) => [...tasks, newTask]);
        });
      }

  updateTask(task: Task,onComplete: () => void) : void {
    this.apiTaskService.updateTask(task,onComplete).subscribe(
      (updatedTask)=> {
        this.tasks.update((tasks)=>
        tasks.map((t)=> (t.id === updatedTask.id ? updatedTask : t ))
        );
      // Appeler le callback après la mise à jour
      onComplete();
        });
     }

  deleteTask(id: number): void {
    this.apiTaskService.deleteTask(id).subscribe(
      ()=> {
        this.tasks.update((tasks) => tasks.filter((t)=>
        t.id !== id));
        });
      }

   //obtenir les tâches par mois.
  getTasksForMonth(startOfMonth: string, endOfMonth: string): Observable<Task[]> {
    return this.apiTaskService.getTasksForMonth(startOfMonth, endOfMonth).pipe(
      // Utiliser `tap` pour gérer les effets secondaires (mettre à jour le signal de tâches)
      tap((tasks) => this.tasks.set(tasks))
      );
    }

  // Obtenez les tâches sous forme de signal
  getTasks(): WritableSignal<Task[]> {
    return this.tasks;
  }
}
