import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {DayPilot} from ' ';
import { TaskService, Task } from 'task.service';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  taskService = inject(TaskService);
  resources: DayPilot.ResourceData[] = [];
  constructor() { }

  getResources(): Observable<any[]> {
    this.taskService.getTasks();
    }
}
