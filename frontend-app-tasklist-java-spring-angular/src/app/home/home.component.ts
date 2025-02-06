import { Component,OnInit } from '@angular/core';
import { TaskListComponent} from  '../task-list/task-list.component';


@Component({
  selector: 'app-home',
  imports: [TaskListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  ngOnInit() : void{
    }
}
