import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';

//TODO: supprimer commentaires inutiles, verifier les modificateurs d acces sur les champs des classes
//TODO: Continuer a suivre les principe SOLID et l optimisation de l architecture

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, CommonModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  iteration = new Array(6);
  title = 'frontend-app-tasklist-java-spring-angular';
}
