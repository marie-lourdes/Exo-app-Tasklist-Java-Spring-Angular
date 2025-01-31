import { Component,OnInit } from '@angular/core';
//import pour les directive ngfor et autres
import {CommonModule} from '@angular/common';
import { TaskListComponent} from  '../task-list/task-list.component';

@Component({
  selector: 'app-home',
  imports: [TaskListComponent,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  ngOnInit() : void{
    }
}
