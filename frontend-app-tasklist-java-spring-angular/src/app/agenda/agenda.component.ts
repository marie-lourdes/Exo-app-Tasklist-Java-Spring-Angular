import { Component,OnInit,signal,WritableSignal,Signal, computed } from '@angular/core';
import {UpperCasePipe} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { AgendaService} from '../service/agenda.service';
import { DateTime,Info,Interval } from "luxon";

@Component({
  selector: 'app-agenda',
  imports: [UpperCasePipe],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements OnInit {
  today = signal<DateTime>(DateTime.local());

  // Récupérer le premier jour du mois actif
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
      this.today().startOf('month'));

  weekDays:Signal<string[]>= signal(Info.weekdays('short'));

  /* splitBy divise  l interval ci dessus en en petite interval de 1 jour : en calculant d abord le  premier jour  du mois courant et le debut de la semaine dans lequel se situe le 1er jour du mois
   //jusqu à la fin du mois et le dernier jour de la semaine dans lequel se situe le dernier du mois et retourne un tableau*/
    daysOfMonth: Signal<DateTime[]> = computed( ()=> {
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


    // Divise les jours en semaines (table de 7 jours par ligne)
      daysInWeeks: Signal<DateTime[][]> = computed(() => {
       const days = this.daysOfMonth();
       const weeks: DateTime[][] = [];
       for (let i = 0; i < days.length; i += 7) {
         weeks.push(days.slice(i, i + 7)); // Regroupe par 7 jours
       }
       return weeks;
     });

  /* MatDialog:
        - C'est un service pour ouvrir et gérer globalement les dialogues.
        - Fournit des méthodes comme `open()` et `closeAll()`.*/

    constructor( private agenda: AgendaService,private dialog: MatDialog
 ){}

    ngOnInit(): void {
    //test luxon library  and method DateTime.local().startOf('month') in agenda service
    console.log("test luxon date: " + this.firstDayOfActiveMonth().toString());
    console.log("test luxon Info.weekDays: " + this.weekDays());
    console.log("nombre de jours du mois : " + this.daysOfMonth().length); //--> '35' element, 7 jours * 5 semaine plus generalement representé dans un agenda comprenant souvent le mois d avant et celui d apres
    console.log("nombre de semaine du mois courant: " + this.daysInWeeks().length);
    console.log("jours du mois courant : " + this.daysOfMonth());
    console.log("semaine du mois courant: " + this.daysInWeeks());

    }

  openModal(day:number) : void {
    // Récupérer le premier jour du mois actif
    //Méthode pour obtenir le mois (`month`) et l'année (`year`) de la date en cours.

    const currentMonthYear = this.firstDayOfActiveMonth();

    // Reformater 'day' en une date complète (yyyy-MM-dd)
    // Combinerle mois/année actuel avec `day` pour créer un objet Luxon représentant la date complète.

    const fullDate = DateTime.local(currentMonthYear.year, currentMonthYear.month, day).toFormat('yyyy-MM-dd');

    console.log('Date complète :', fullDate);


    const dialogRef = this.dialog.open(ModalComponent, {
      width:'400px',
      data: { date:fullDate} // passe la date selectionné depuis le template agenda
      });

    dialogRef.afterClosed().subscribe(result => {
      console.log('le modal a été fermé', result);
      });
    }

}

