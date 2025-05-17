import { Injectable, OnInit, Inject, WritableSignal, signal, computed } from '@angular/core';
import { Observable, tap } from 'rxjs';
//import { ApiTaskService } from './api-task.service';
import { ApiTaskService } from '@app/core';
import { ITask, CompletedTasksStrategy, PendingTasksStrategy} from '@app/shared';

//TODO: Appliquer le pattern strategy avec des declinaison de tri pour les taches completées et en cours avec des interfaces et classes comcretes
/*1. **Gérer la logique métier des tâches** (organiser les tâches, grouper par date, gérer les `Signal` Angular).
  2. **Maintenir un état réactif** (via `WritableSignal` ou `ComputedSignal`).
*/
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  // Signal contenant toutes les tâches
  private tasks: WritableSignal<ITask[]> = signal([]);

  constructor(private apiTaskService: ApiTaskService,
    private readonly completedTasksStrategy: CompletedTasksStrategy,
    private readonly pendingTasksStrategy: PendingTasksStrategy) {
    this.loadTasks(); // Charger les tâches  à l initialisation
  }

  // Charger les tâches depuis le backend et les insérer dans le signal `tasks`
  loadTasks(): void {
    this.apiTaskService.getTasks().subscribe(tasks => {
      this.tasks.set(tasks);
    });
  }

  createTask(task: ITask): void {
    this.apiTaskService.createTask(task).subscribe(newTask => {
      this.tasks.update(tasks => [...tasks, newTask]);
    });
  }

  updateTask(task: ITask, onComplete: () => void): void {
    this.apiTaskService.updateTask(task, onComplete).subscribe(updatedTask => {
      this.tasks.update(tasks => tasks.map(t => (t.id === updatedTask.id ? updatedTask : t)));
      // Appeler le callback après la mise à jour
      onComplete();
    });
  }

  deleteTask(id: number): void {
    this.apiTaskService.deleteTask(id).subscribe(() => {
      this.tasks.update(tasks => tasks.filter(t => t.id !== id));
    });
  }

  // Obtenez les tâches sous forme de signal
  getTasks(): WritableSignal<ITask[]> {
    return this.tasks;
  }

  // Pour obtenir directement les tâches filtrées et terminées
  getCompletedTask():ITask[] {
    return this.completedTasksStrategy.sort(this.tasks());
  }

 // Pour obtenir directement les tâches filtrées et en cours
  getPendingTask():ITask[] {
    return this.pendingTasksStrategy.sort(this.tasks());
  }
}
