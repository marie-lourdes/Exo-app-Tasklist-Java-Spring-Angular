import { Injectable,OnInit,Inject,WritableSignal, signal } from '@angular/core';
import { ApiTaskService } from './api-task.service';
import {  ApiTaskService,Task } from './api-task.service';


/*1. **Gérer la logique métier des tâches** (organiser les tâches, grouper par date, gérer les `Signal` Angular).
  2. **Maintenir un état réactif** (via `WritableSignal` ou `ComputedSignal`).
*/
@Injectable({
  providedIn: 'root'
})
export class  TaskService {

  // Signal contenant toutes les tâches
  private tasks: WritableSignal<Task[]> = signal([]);

  constructor(private apiTaskService: ApiTaskService) {
     console.log('Base URL:', this.apiUrl);
     this.loadTasks(); // Charger les tâches initiales
     }

  // Charger les tâches depuis le backend et les insérer dans le signal `tasks`
  loadTasks(): void {
    this.apiTaskService.getTasks.subscribe(
      (tasks)=> {
        this.tasks.set(tasks);
        });
      }

  createTask(task: Task): void {
    this.apiTaskService.createTask(task).subscribe(
      (newTask) =>{
        this.tasks.update((tasks) => [...tasks, newTask]);
        });
      }

  updateTask(task: Task,onComplete: () => void) : void {
    this.apiTaskService.updateTask(task).subscribe(
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

  getTasksByDate(date: string | null): WritableSignal<Task[]> {
    // Créer un signal pour contenir les tâches par date
     const tasksByDate = computed(() =>
          this.tasks().filter((task) => task.date === date)
        );
      return tasksByDate;
     }

   //obtenir les tâches par mois.
  getTasksForMonth(startOfMonth: string, endOfMonth: string): void {
    this.apiTaskService.getTasksForMonth(startOfMonth, endOfMonth).subscribe(
      (tasks) => {
         this.tasks.set(tasks); // Remplace les tâches dans l'état local avec le résultat du backend
        });
      )
    }

  // Obtenez les tâches sous forme de signal
  getTasks(): WritableSignal<Task[]> {
    return this.tasks;
  }
}
