import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BASE_URL_API} from '../../environments/app.token';

@Injectable({
  providedIn: 'root'
})
export class ApiTaskService {

    constructor(private http: HttpClient, @Inject(BASE_URL_API) private apiUrl: string) {
      }

    createTask(task: Task): void {
      this.http.post<Task>(`${this.apiUrl}/save`, task);
      }

    updateTask(task: Task,onComplete: () => void) : void {
      this.http.put<Task>(`${this.apiUrl}/update/${task.id}`, task);
      }

    deleteTask(id: number): void {
      this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
      }


    getTasksByDate(date: string | null): WritableSignal<Task[]> {
      return this.http.get<Task[]>(`${this.apiUrl}/details/${date}`);
      }

    getTasksForMonth(startOfMonth: string, endOfMonth: string): Observable<Task[]> {
      return this.http.get<Task[]>(
        `${this.apiUrl}/tasks?start=${startOfMonth}&end=${endOfMonth}`
       );
      }
}
