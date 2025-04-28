import { Component } from '@angular/core';
import { TaskListComponent } from '../../features/task-list/task-list.component';
import { LoadSpinnerComponent } from '@app/shared';

@Component({
  selector: 'app-home',
  imports: [TaskListComponent, LoadSpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
