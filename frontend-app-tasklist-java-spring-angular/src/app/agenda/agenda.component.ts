import { Component,OnInit,inject,signal,WritableSignal,Signal, computed } from '@angular/core';
import {CommonModule,UpperCasePipe} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { LoadSpinnerComponent} from '../load-spinner/load-spinner.component';
import { TaskService } from '../service/task.service';
import {  Task } from '../model/task';
import { DateTime,Info,Interval } from "luxon";
import {Observable, interval, tap, take} from 'rxjs';

@Component({
  selector: 'app-agenda',
  imports: [CommonModule,LoadSpinnerComponent],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements OnInit {
  //TODO: fixer erreur pour les taches qui ne sont plus enregistrer ou lu dans les cellules, le modal ,
  // TODO:fixer le stockage du computed avec taskbydate dans la methode getTaskByDate de Taskservice ?
  taskService = inject(TaskService);

  // Signal pour la date actuelle
  today = signal<DateTime>(DateTime.local());

  // Récupérer le premier jour du mois actif
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
      DateTime.local().startOf('month'));

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

    constructor(private dialog: MatDialog){}

    ngOnInit(): void {
      this.loadTasksForCurrentMonth();

    }

// Charger les tâches pour le mois actif
  loadTasksForCurrentMonth(): void {
    const startOfMonth = this.firstDayOfActiveMonth().toISODate(); // Date au format `YYYY-MM-DD`
    const endOfMonth =this.firstDayOfActiveMonth().endOf('month').toISODate();
    const startOfMonthSafe = startOfMonth || '';
    const endOfMonthSafe  = endOfMonth || '';

    // Requête pour récupérer les tâches entre `startOfMonth` et `endOfMonth`
    this.taskService.getTasksForMonth(startOfMonthSafe, endOfMonthSafe).subscribe((tasks) => {
      const updatedTasks = new Map<string, Task[]>();
      tasks.forEach((task) => {
        if (!updatedTasks.has(task.date)) {
          updatedTasks.set(task.date, []);
        }
        updatedTasks.get(task.date)!.push(task);
      });
    });
  }

  // Naviguer vers le mois précédent
  navigateToPreviousMonth(): void {
    this.firstDayOfActiveMonth.update((current) =>
      current.minus({ months: 1 }).startOf('month')
    );
    this.loadTasksForCurrentMonth();
  }

  // Naviguer vers le mois suivant
  navigateToNextMonth(): void {
    this.firstDayOfActiveMonth.update((current) =>
      current.plus({ months: 1 }).startOf('month')
    );
      this.loadTasksForCurrentMonth();
  }

  // Ouvrir un modal pour ajouter une tâche à une date donnée

  openModal(day:DateTime) : void {
    const selectedDate = day.toISODate(); // Format YYYY-MM-DD
    const tasksForDate = this.taskService.getTasksByDate(selectedDate);
    console.log('Tâches pour la date', selectedDate, tasksForDate());


    const dialogRef = this.dialog.open(ModalComponent, {
      width:'400px',
      data: {
        date: selectedDate,
        tasks: tasksForDate
        } // passe la date selectionné depuis le template agenda
      });

    // Mise à jour des tâches après la fermeture du modal
    dialogRef.afterClosed().subscribe(() => {
      console.log('le modal a été fermé');
      this.loadTasksForCurrentMonth(); // Recharger les tâches après la fermeture du modal
      });
    }
}

