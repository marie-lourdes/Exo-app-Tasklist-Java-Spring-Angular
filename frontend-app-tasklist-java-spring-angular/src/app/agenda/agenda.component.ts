import { Component,OnInit,signal,WritableSignal,Signal, computed } from '@angular/core';
import {UpperCasePipe} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { TaskService, Task } from '../service/task.service';
import { DateTime,Info,Interval } from "luxon";

@Component({
  selector: 'app-agenda',
  imports: [UpperCasePipe],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements OnInit {
  //TODO: utiliser la méthode `getTasksByDate(date)` du service **TaskService** pour récupérer les tâches associées à une date spécifique, puis les afficher dans une liste au sein de votre agenda

  today = signal<DateTime>(DateTime.local());

  // Récupérer le premier jour du mois actif
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
      this.today().startOf('month'));

  weekDays:Signal<string[]>= signal(Info.weekdays('short'));

  /* splitBy divise  l interval ci dessus en en petite interval de 1 jour : en calculant d abord le  premier jour  du mois courant et le debut de la semaine dans lequel se situe le 1er jour du mois
   //jusqu à la fin du mois et le dernier jour de la semaine dans lequel se situe le dernier du mois et retourne un tableau*/
    daysOfMonth: Signal<DateTime[]> = computed(() => {
      return Interval.fromDateTimes(
        this.firstDayOfActiveMonth().startOf('week'),
        this.firstDayOfActiveMonth().endOf('month').endOf('week')
        )
      .splitBy({ day: 1 })
      .map((interval) => interval.start!)


      .filter((date) => !!date);
      /*start! : -Dit explicitement à TypeScript qu'une valeur n'est **ni `null` ni `undefined`.**
                 -| Supprime les vérifications de sécurité automatiques pour `null` et `undefined`.
                  */

      /* l operateur !! force une valeur pure booleenne au lieu du simple ! qui inverse la valeur
      L'opérateur `!!` est une manière concise de convertir toute valeur en un **booléen** (true/false) en JavaScript/TypeScript.
        - La première **négation (`!`)** transforme une valeur en son opposé booléen :
            - Une valeur "truthy" devient `false`.
            - Une valeur "falsy" devient `true`.

        - La seconde **négation (`!`)** inverse à nouveau cette valeur, la ramenant à son équivalent booléen d'origine :
            - Une valeur "truthy" redevient `true`.
            - Une valeur "falsy" redevient `false`.
        toute les dates pure truthy seront conservé, DateTime<boolean>*/

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

    // Signal pour gérer les listes de tâches par date
    tasksByDate = signal<Map<string, Task[]>>(new Map());



  /* MatDialog:
        - C'est un service pour ouvrir et gérer globalement les dialogues.
        - Fournit des méthodes comme `open()` et `closeAll()`.*/

    constructor( private taskService: TaskService,private dialog: MatDialog){}

    ngOnInit(): void {
    //test luxon library  and method DateTime.local().startOf('month') in agenda service
    console.log("test luxon date: " + this.firstDayOfActiveMonth().toString());
    console.log("test luxon Info.weekDays: " + this.weekDays());
    console.log("nombre de jours du mois : " + this.daysOfMonth().length); //--> '35' element, 7 jours * 5 semaine plus generalement representé dans un agenda comprenant souvent le mois d avant et celui d apres
    console.log("nombre de semaine du mois courant: " + this.daysInWeeks().length);
    console.log("jours du mois courant : " + this.daysOfMonth());
    console.log("semaine du mois courant: " + this.daysInWeeks());
    // Charger toutes les tâches au démarrage et les organiser par date
     this.taskService.getTasks().subscribe((tasks) => {
              const tasksMap = new Map<string, Task[]>();

              // Grouper les tâches par date
              tasks.forEach((task) => {
                const date = task.date;
                if (!tasksMap.has(date)) {
                  tasksMap.set(date, []);
                }
                tasksMap.get(date)?.push(task);
              });

              this.tasksByDate.set(tasksMap);
            });

    }

  openModal(day:DateTime) : void {

    /*// Récupérer le premier jour du mois actif
    //Méthode pour obtenir le mois (`month`) et l'année (`year`) de la date en cours.

    const currentMonthYear = this.firstDayOfActiveMonth();

    // Reformater 'day' en une date complète (yyyy-MM-dd)
    // Combinerle mois/année actuel avec `day` pour créer un objet Luxon représentant la date complète.

    const fullDate = DateTime.local(currentMonthYear.year, currentMonthYear.month, day).toFormat('yyyy-MM-dd');

    console.log('Date complète :', fullDate);*/

    /*En JavaScript natif, pour un objet `Date`,
    vous pouvez obtenir une date ISO complète avec `toISOString()`,
    mais cela inclut aussi l'heure et le décalage horaire
    La méthode `toISODate()` appartient à **Luxon** et non au JavaScript natif.*/

    const selectedDate = day.toISODate(); // Format YYYY-MM-DD


    const dialogRef = this.dialog.open(ModalComponent, {
      width:'400px',
      data: { date:selectedDate} // passe la date selectionné depuis le template agenda
      });

    // Mise à jour des tâches après la fermeture du modal
    dialogRef.afterClosed().subscribe(() => {
      console.log('le modal a été fermé');
      this.loadTasksByDate(selectedDate);

      });
    }

   // Charger toutes les tâches pour une date donnée et mettre à jour la signal
    private loadTasksByDate(date: string): void {
      this.taskService.getTasksByDate(date).subscribe((tasks) => {
        const tasksMap = this.tasksByDate();
        tasksMap.set(date, tasks);
        this.tasksByDate.set(tasksMap);
      });
    }

   // Récupérer les tâches d'une date sous forme de tableau (pour afficher dans l'agenda)
    getTasksForDate(date: DateTime): Task[] {
      return this.tasksByDate().get(date.toISODate()) || [];
    }



}

