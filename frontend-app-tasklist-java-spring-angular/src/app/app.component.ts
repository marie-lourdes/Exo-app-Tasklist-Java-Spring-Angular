import { Component,OnInit } from '@angular/core';
import {CommonModule} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoadSpinnerComponent} from  './load-spinner/load-spinner.component';
import { HeaderComponent} from  './header/header.component';
import { AgendaService} from  './service/agenda.service';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule, HeaderComponent, LoadSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  implements OnInit {
  iteration = new Array(6);
  title = 'frontend-app-tasklist-java-spring-angular';

  constructor(private agenda: AgendaService){}

  ngOnInit(): void {
  }
}
