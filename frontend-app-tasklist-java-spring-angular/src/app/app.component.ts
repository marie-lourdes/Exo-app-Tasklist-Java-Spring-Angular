import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {TaskComponent} from './task/task.component';


@Component({
  selector: 'app-root',
  imports: [TaskComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app-tasklist-java-spring-angular';
  // lien configuré pour le dossier assets dans angular.json
  path ='./assets/images/logo.png';
}
