import { Component } from '@angular/core';
//import pour les directive ngfor et autres
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
     iteration = new Array(5);
}
