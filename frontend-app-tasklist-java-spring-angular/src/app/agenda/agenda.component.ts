<<<<<<< Updated upstream
=======
import { Component,ViewChild, AfterViewInit } from '@angular/core';
import {DayPilot,  DayPilotCalendarComponent,DayPilotModule} from '@daypilot/daypilot-lite-angular';
import { AgendaService} from '../service/agenda.service';

@Component({
  selector: 'app-agenda',
  imports: [],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements AfterViewInit {




    constructor(private agendaService: AgendaService) {
    }

   ngAfterViewInit(): void {

    }

}
>>>>>>> Stashed changes
