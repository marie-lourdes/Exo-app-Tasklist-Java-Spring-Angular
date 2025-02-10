import { Injectable, inject,signal,WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { DateTime } from "luxon";

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

   today = signal<DateTime>(DateTime.local());
    firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
      this.today().startOf('month'));
 // resources: DayPilot.ResourceData[] = [];
  constructor() { }

}
