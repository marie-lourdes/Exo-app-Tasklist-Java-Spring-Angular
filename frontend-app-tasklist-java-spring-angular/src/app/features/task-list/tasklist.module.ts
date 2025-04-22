import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasklistRoutingModule } from './tasklist-routing.module';
//TODO: Ajouter core module qui dans son provieder a deja TaskService et terminer les routes pour chaque composants

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TasklistRoutingModule
  ]
})
export class TasklistModule { }
