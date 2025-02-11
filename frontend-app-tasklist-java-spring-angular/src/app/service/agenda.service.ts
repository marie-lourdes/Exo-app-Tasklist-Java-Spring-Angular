import { Injectable, inject,signal,WritableSignal,Signal, computed } from '@angular/core';
import { Observable } from 'rxjs';
import { DateTime,Info,Interval } from "luxon";

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  today = signal<DateTime>(DateTime.local());

  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
    this.today().startOf('month'));

  weekDays:Signal<string[]>= signal(Info.weekdays('short'));

  dayOfMonth: Signal<DateTime[]> = computed( ()=> {
  return Interval.fromDateTimes(
     this.firstDayOfActiveMonth().startOf('week'),
     this.firstDayOfActiveMonth().endOf('month').endOf('week')
     )
   .splitBy({day:1})
   .map((day) => {
     if( day.start === null ){
       throw new Error('Wrong dates');
       }
     return day.start; // retourne  le start de l interval courant ,dans le tableau  chaque index contient les valeur "start" et "end" des petit intervales
     });
    });


  /* splitBy divise  l interval ci dessus en en petite interval de 1 jour : en calculant d abord le  premier jour  du mois courant et le debut de la semaine dans lequel se situe le 1er jour du mois
   //jusqu à la fin du mois et le dernier jour de la semaine dans lequel se situe le dernier du mois et retourne un tableau*/

  constructor() {
    //test luxon library  and method DateTime.local().startOf('month') in agenda service
    console.log("test luxon date: " + this.firstDayOfActiveMonth().toString());
    console.log("test luxon Info.weekDays: "+ this.weekDays());
    // console.log("test luxon Interval : "+ this. dayOfMonth().length); --> '35' element, 7 jours * 5 semaine plus generalement representé dans un agenda comprenant souvent le mois d avant et celui d apres
    console.log("test luxon Interval : "+ this. dayOfMonth());
    }

}
