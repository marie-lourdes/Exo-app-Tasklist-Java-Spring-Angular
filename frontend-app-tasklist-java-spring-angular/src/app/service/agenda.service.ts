import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  //inject pas necessaire dans une classe service ≠ agendacomponent
  constructor(private taskService: TaskService) {}

  // Récupère un signal réactif contenant les tâches pour une date spécifique
  getTasksByDate(date: string | null): WritableSignal<Task[]> {
    const tasks = this.taskService.getTasks();
    return computed(() => tasks().filter((task) => task.date === date));
    }

  // ComputedSignal contenant les tâches groupées par date
  groupedTasksByDate(): Signal<Map<string, Task[]>> {
    const tasks = this.taskService.getTasks(); // Obtient toutes les tâches
    return computed(() => {
      const grouped = new Map<string, Task[]>();
      tasks().forEach((task) => {
        if (!grouped.has(task.date)) {
          grouped.set(task.date, []);// Initialiser un tableau de tâches pour cette date
        }
        grouped.get(task.date)?.push(task);// Ajouter la tâche à la date correspondante
        });
      return grouped; // Retourne une Map où chaque clé est une date, et chaque valeur est un tableau de tâches
      });
    }

   //obtenir les tâches par mois.
  getTasksForMonth(startOfMonth: string, endOfMonth: string): Observable<Task[]> {
    return this.taskService.getTasksForMonth(startOfMonth, endOfMonth).pipe(
      // Utiliser `tap` pour gérer les effets secondaires (mettre à jour le signal de tâches)
      tap((tasks) => this.tasks.set(tasks))
      );
    }





}
