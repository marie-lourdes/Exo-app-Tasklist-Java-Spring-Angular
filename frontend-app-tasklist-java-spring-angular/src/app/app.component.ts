import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent} from  './home/home.component';
import { TaskListComponent} from  './task-list/task-list.component';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HomeComponent,TaskListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend-app-tasklist-java-spring-angular';
  // lien configuré pour le dossier assets dans angular.json
  path ='./assets/images/logo.png';
}
