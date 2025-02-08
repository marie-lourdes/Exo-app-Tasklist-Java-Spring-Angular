import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgendaComponent } from './agenda.component';

export * from './day/calendar-day.module';
@NgModule({
  imports: []
  declarations: [AgendaComponent],
  exports: [
    AgendaComponent
    ]
})
export class AgendaModule { }
