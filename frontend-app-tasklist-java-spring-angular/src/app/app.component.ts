import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {HomeComponent} from './home/home.component';


@Component({
  selector: 'app-root',
  imports: [HomeComponent,TaskListComponent,RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-app-tasklist-java-spring-angular';
  // lien configuré pour le dossier assets dans angular.json
  path ='./assets/images/logo.png';
}
