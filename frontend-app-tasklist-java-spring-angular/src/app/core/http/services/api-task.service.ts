import { Injectable, Inject, WritableSignal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_URL_API } from '@environments/app.token';
import { ITask } from '@app/shared';
import { ICrudOperation } from '@app/core';

//TODO: ecrire test unitaire du service
/*### **Gestion des appels HTTP** */
@Injectable({
  providedIn: 'root',
})
export class ApiTaskService implements ICrudOperation {
  constructor(
    private http: HttpClient,
    @Inject(BASE_URL_API) private apiUrl: string
  ) {
    console.log('Base URL:', this.apiUrl);
  }

  createTask(task: ITask): Observable<ITask> {
    return this.http.post<ITask>(`${this.apiUrl}/save`, task);
  }

  updateTask(task: ITask, onComplete: () => void): Observable<ITask> {
    return this.http.put<ITask>(`${this.apiUrl}/update/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`);
  }

  // Charger à partir du backend et setter dans le signal
  getTasks(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.apiUrl);
  }
}
