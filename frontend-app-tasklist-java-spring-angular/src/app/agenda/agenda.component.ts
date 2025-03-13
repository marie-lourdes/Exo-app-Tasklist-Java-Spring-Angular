import { Component,OnInit,inject,signal,WritableSignal,Signal, computed } from '@angular/core';
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
  taskService = inject(TaskService);
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

     // ComputedSignal pour grouper les tâches par date
      groupedTasksByDate: Signal<Map<string, Task[]>> = computed(() => {
        const tasks = this.taskService.getTasks(); // Obtient toutes les tâches
        const grouped = new Map<string, Task[]>();

        tasks().forEach((task) => {
          if (!grouped.has(task.date)) {
            grouped.set(task.date, []);// Initialiser un tableau de tâches pour cette date

          }
          grouped.get(task.date)?.push(task);// Ajouter la tâche à la date correspondante

        });

        return grouped; // Retourne une Map où chaque clé est une date, et chaque valeur est un tableau de tâches

      });




  /* MatDialog:
        - C'est un service pour ouvrir et gérer globalement les dialogues.
        - Fournit des méthodes comme `open()` et `closeAll()`.*/

    constructor(private dialog: MatDialog){}

    ngOnInit(): void {
    //test luxon library  and method DateTime.local().startOf('month') in agenda service
    console.log("test luxon date: " + this.firstDayOfActiveMonth().toString());
    console.log("test luxon Info.weekDays: " + this.weekDays());
    console.log("nombre de jours du mois : " + this.daysOfMonth().length); //--> '35' element, 7 jours * 5 semaine plus generalement representé dans un agenda comprenant souvent le mois d avant et celui d apres
    console.log("nombre de semaine du mois courant: " + this.daysInWeeks().length);
    console.log("jours du mois courant : " + this.daysOfMonth());
    console.log("semaine du mois courant: " + this.daysInWeeks());
    // Charger toutes les tâches au démarrage et les organiser par date
    this.groupedTasksByDate();


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
      //this.loadTasksByDate(selectedDate);

      });
    }

/* *******Apres refactoring avec le computedSignal  groupedTasksByDate:************
 La méthode `loadTasksByDate` n'est **pas nécessaire** dans le contexte actuel,
  car les nouvelles méthodologies basées sur **signals** et les **computed signals** rendent ces types de méthodes gestionnaires superflues. Analysons pourquoi.
  ### **1. Appel de `getTasksForDate` dans `ngOnInit`**
  Appeler directement `getTasksForDate` dans `ngOnInit` n'est **pas nécessaire** non plus. Voici pourquoi :
  - La méthode **`getTasksForDate`** est une méthode "d'accès" aux tâches déjà regroupées par date, grâce à votre `tasksByDate` signal (ou `groupedTasksByDate`).
  La méthode retourne simplement les données lorsque vous en avez besoin.
  - Les données collectées sont dépendantes des `signals`.
  La collection (ou "fetch data") se fait automatiquement via votre service et l'utilisation des `computed signals`.


  // Charger toutes les tâches pour une date donnée et mettre à jour la signal
    private loadTasksByDate(date: string): void {
       return this.tasksByDate().get(date) || [];

      this.taskService.getTasksByDate(date).subscribe((tasks) => {
        const tasksMap = this.tasksByDate();
        tasksMap.set(date, tasks);
        this.tasksByDate.set(tasksMap);
      });
    }*/

   // Récupérer les tâches d'une date sous forme de tableau (pour afficher dans l'agenda)
    getTasksForDate(date: DateTime| null): Task[] {
      return this.tasksByDate().get(date?.toISODate() ?? '') || [];

    }

    /*1. **La clé n'existe pas dans la `Map`** :
        - Lorsque `tasksByDate` ne contient aucune entrée pour la clé correspondant à la date donnée (`toISODate`), l'appel à `.get()` renverra `undefined`.

    2. **Assurer un comportement prévisible :**
        - En utilisant `|| []`, vous renvoyez toujours un tableau, ce qui est plus facile à manipuler en aval dans la logique métier ou le template.
        - **Exemple dans un template Angular :***/



}

