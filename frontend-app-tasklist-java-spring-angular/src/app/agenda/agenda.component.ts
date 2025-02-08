import { Component,ViewChild, OnInit  } from '@angular/core';
import { AgendaService} from '../service/agenda.service';

@Component({
  selector: 'app-agenda',
  imports: [],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements OnInit {
  viewDate:Date= new Date();
  constructor(private agendaService: AgendaService) {
    }

   ngOnInit(): void {

    }

}

