import { Injectable, computed, Signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService } from '@app/core';
import { Task } from '@app/shared';

@Injectable({
  providedIn: 'root',
})
export class AgendaService {
  //inject pas necessaire dans une classe service ≠ agendacomponent
  constructor(private taskService: TaskService) {}

  // Récupère un signal réactif contenant les tâches pour une date spécifique
  getTasksByDate(date: string | null): Signal<Task[]> {
    const tasks = this.taskService.getTasks();
    return computed(() => tasks().filter(task => task.date === date));
  }

  // ComputedSignal contenant les tâches groupées par date
  groupedTasksByDate(): Signal<Map<string, Task[]>> {
    const tasks = this.taskService.getTasks(); // Obtient toutes les tâches
    return computed(() => {
      const grouped = new Map<string, Task[]>();
      tasks().forEach(task => {
        if (!grouped.has(task.date)) {
          grouped.set(task.date, []); // Initialiser un tableau de tâches pour cette date
        }
        grouped.get(task.date)?.push(task); // Ajouter la tâche à la date correspondante
      });
      return grouped; // Retourne une Map où chaque clé est une date, et chaque valeur est un tableau de tâches
    });
  }
  getAllTasks(): WritableSignal<Task[]> {
    return this.taskService.getTasks();
  }

  addOneTask(task: Task): void {
    this.taskService.getTasks();

  }

}
