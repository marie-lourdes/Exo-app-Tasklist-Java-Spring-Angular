import { Injectable, Inject, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {BASE_URL_API} from '../../environments/app.token';
import {  Task } from '../model/task';

/*### **Gestion des appels HTTP** */
@Injectable({
  providedIn: 'root'
})
export class ApiTaskService {

    constructor(private http: HttpClient, @Inject(BASE_URL_API) private apiUrl: string) {
      console.log('Base URL:', this.apiUrl);
      }

    createTask(task: Task): Observable<Task> {
      return this.http.post<Task>(`${this.apiUrl}/save`, task);
      }

    updateTask(task: Task,onComplete: () => void) : Observable<Task> {
      return this.http.put<Task>(`${this.apiUrl}/update/${task.id}`, task);
      }

    deleteTask(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
      }

    getTasksByDate(date: string | null): Observable<Task[]>{
      return this.http.get<Task[]>(`${this.apiUrl}/details/${date}`);
      }

    getTasksForMonth(startOfMonth: string, endOfMonth: string): Observable<Task[]> {
      return this.http.get<Task[]>(
        `${this.apiUrl}/tasks?start=${startOfMonth}&end=${endOfMonth}`
       );
      }
    // Charger à partir du backend et setter dans le signal
    getTasks(): Observable<Task[]>{
      return this.http.get<Task[]>(this.apiUrl);
      }
}
