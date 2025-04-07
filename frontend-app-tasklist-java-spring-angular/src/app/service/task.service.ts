import { Injectable,OnInit,Inject,WritableSignal, signal } from '@angular/core';
import { Observable } from 'rxjs';


export interface Task {
     id?: number;
     title: string;
     completed: boolean;
     description?: string;
     date: string; // Format: YYYY-MM-DD
   }

@Injectable({
  providedIn: 'root'
})
export class  TaskService {
  // Signal contenant toutes les tâches
  private tasks: WritableSignal<Task[]> = signal([]);

  constructor() {
     console.log('Base URL:', this.apiUrl);
     this.loadTasks(); // Charger les tâches initiales
  }

  createTask(task: Task): void {
     this.http.post<Task>(`${this.apiUrl}/save`, task).subscribe(
      (newTask) =>{
        this.tasks.update((tasks) => [...tasks, newTask]);
      });
  }

  updateTask(task: Task,onComplete: () => void) : void {
    this.http.put<Task>(`${this.apiUrl}/update/${task.id}`, task).subscribe(
       (updatedTask)=> {
         this.tasks.update((tasks)=>
           tasks.map((t)=> (t.id === updatedTask.id ? updatedTask : t ))
         );
         // Appeler le callback après la mise à jour
           onComplete();

       });
  }

  deleteTask(id: number): void {
    this.http.delete<void>(`${this.apiUrl}/delete/${id}`).subscribe(
      ()=> {
        this.tasks.update((tasks) => tasks.filter((t)=>
          t.id !== id));
    });
  }

  getTasksByDate(date: string | null): WritableSignal<Task[]> {
    // Créer un signal pour contenir les tâches par date
    const tasksByDate: WritableSignal<Task[]> = signal([]);
   this.http.get<Task[]>(`${this.apiUrl}/details/${date}`).subscribe({
     next: (tasks) => tasksByDate.set(tasks),
     error: (err) => console.error('Error fetching tasks by date:', err)
   });
   return tasksByDate;

  }

 //obtenir les tâches par mois.
 getTasksForMonth(startOfMonth: string, endOfMonth: string): Observable<Task[]> {
   return this.http.get<Task[]>(
     `${this.apiUrl}/tasks?start=${startOfMonth}&end=${endOfMonth}`
   );
 }

// Obtenez les tâches sous forme de signal
  getTasks(): WritableSignal<Task[]> {
    return this.tasks;
  }

// Charger à partir du backend et setter dans le signal
   loadTasks(): void {
    this.http.get<Task[]>(this.apiUrl).subscribe(
      (tasks)=> {
        this.tasks.set(tasks); // Mettre à jour le contenu du signal
        });
  }
}
