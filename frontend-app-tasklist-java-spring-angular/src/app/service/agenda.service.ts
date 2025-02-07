import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskService, Task } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  taskService = inject(TaskService);
 // resources: DayPilot.ResourceData[] = [];
  constructor() { }

  getResources(): Observable<any[]> {
    return this.taskService.getTasks();
    }
}
