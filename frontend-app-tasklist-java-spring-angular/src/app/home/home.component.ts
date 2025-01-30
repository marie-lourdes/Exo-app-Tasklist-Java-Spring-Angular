import { Component,OnInit } from '@angular/core';
//import pour les directive ngfor et autres
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  iteration = new Array(5);

  ngOnInit() : void{
    }
}
