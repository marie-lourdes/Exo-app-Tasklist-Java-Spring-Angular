import { Component,OnInit } from '@angular/core';
import { TaskListComponent} from  '../task-list/task-list.component';
import { LoadSpinnerComponent} from  '../load-spinner/load-spinner.component';


@Component({
  selector: 'app-home',
  imports: [TaskListComponent,LoadSpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  ngOnInit() : void{}
}
