import { Component,ViewChild, AfterViewInit } from '@angular/core';
import {DayPilot, DayPilotSchedulerComponent} from 'daypilot-pro-angular';
import { AgendaService} from 'agenda.service';

@Component({
  selector: 'app-agenda',
  //imports: [],
  imports: [DayPilotModule],
  // providers: [DataService],
  template: `<daypilot-scheduler [config]="config" [events]="events" #scheduler></daypilot-scheduler>`,
   styles: [``]
 /* templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'*/
})
export class AgendaComponent implements AfterViewInit {
    constructor(private agendaService: AgendaService) {
    }

}
