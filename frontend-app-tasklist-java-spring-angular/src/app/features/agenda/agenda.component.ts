import { Component,OnInit,inject,signal,WritableSignal,Signal, computed } from '@angular/core';
import {UpperCasePipe} from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from './modal/modal.component';
import { LoadSpinnerComponent} from '../../shared/components/load-spinner/load-spinner.component';
import { AgendaService } from './services/agenda.service';
import {  Task } from '../../shared/model/task';
import { DateTime,Info,Interval } from "luxon";
import {Observable, interval, tap, take} from 'rxjs';

@Component({
  selector: 'app-agenda',
  imports: [CommonModule,LoadSpinnerComponent,ModalComponent],
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements OnInit {
  agendaService = inject(AgendaService);

  // Signal pour la date actuelle
  today = signal<DateTime>(DateTime.local());

  // Récupérer le premier jour du mois actif
  firstDayOfActiveMonth: WritableSignal<DateTime> = signal(
      DateTime.local().startOf('month'));

  weekDays:Signal<string[]>= signal(Info.weekdays('short'));

  daysOfMonth: Signal<DateTime[]> = computed(() => {
    return Interval.fromDateTimes(
      this.firstDayOfActiveMonth().startOf('week'),
      this.firstDayOfActiveMonth().endOf('month').endOf('week'))
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

  groupedTasksByDate = this.agendaService.groupedTasksByDate();

  constructor(private dialog: MatDialog){}

  ngOnInit(): void {
    }

  // Naviguer vers le mois précédent
  navigateToPreviousMonth(): void {
    this.firstDayOfActiveMonth.update((current) =>
      current.minus({ months: 1 }).startOf('month')
    );
  }

  // Naviguer vers le mois suivant
  navigateToNextMonth(): void {
    this.firstDayOfActiveMonth.update((current) =>
      current.plus({ months: 1 }).startOf('month')
    );
  }

  // Ouvrir un modal pour ajouter une tâche à une date donnée

  openModal(day:DateTime) : void {
    const selectedDate = day.toISODate(); // Format YYYY-MM-DD
    const tasksForDate = this.agendaService.getTasksByDate(selectedDate);
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
      });
    }
}

