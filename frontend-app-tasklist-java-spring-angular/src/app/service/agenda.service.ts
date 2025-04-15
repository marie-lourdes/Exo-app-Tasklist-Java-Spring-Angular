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


}
