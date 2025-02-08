import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule, DateAdapter } from 'angular-calendar';
import { CalendarModule, adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AgendaComponent } from './agenda.component';


@NgModule({
  imports: [
     CalendarModule.forRoot(
       {provide: DateAdapter,useFactory: adapterFactory }
     )
    ]
  declarations: [AgendaComponent],
  exports: [AgendaComponent]
})
export class AgendaModule { }
