import { Component } from '@angular/core';
//import pour les directive ngfor et autres
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-task',
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  iteration = new Array(5);
}
