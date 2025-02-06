import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { TaskListComponent} from  './task-list/task-list.component';
import { LoadSpinnerComponent} from  './load-spinner/load-spinner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule, TaskListComponent,LoadSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  iteration = new Array(6);
  title = 'frontend-app-tasklist-java-spring-angular';
  // lien configuré pour le dossier assets dans angular.json
  path ='./assets/images/logo.png';
}
