import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HomeComponent} from  './home/home.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  iteration = new Array(6);
  title = 'frontend-app-tasklist-java-spring-angular';
  // lien configuré pour le dossier assets dans angular.json
  path ='./assets/images/logo.png';
}
