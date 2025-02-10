import { Injectable, inject,signal,WritableSignal,Signal } from '@angular/core';
import { Observable } from 'rxjs';
import { DateTime,Info } from "luxon";

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  today = signal<DateTime>(DateTime.local());
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month'));
  weekDays:Signal<string[]>= signal(Info.weekdays('short'));
 // dayOfMonth:


 // resources: DayPilot.ResourceData[] = [];
  constructor() {
    //test luxon library  and method DateTime.local().startOf('month') in agenda service
    console.log("test luxon date: " + this.firstDayOfActiveMonth().toString());
    console.log("test luxon Info.weekDays: "+ this.weekDays());
    }

}
