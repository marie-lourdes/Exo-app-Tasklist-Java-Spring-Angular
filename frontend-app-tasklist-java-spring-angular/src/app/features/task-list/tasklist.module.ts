import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { TaskListComponent } from './task-list.component'; // ajuste le chemin selon ta structure
//import { TasklistRoutingModule } from './tasklist-routing.module';
//TODO: Ajouter core module qui dans son provieder a deja TaskService et terminer les routes pour chaque composants

//Les composants stanlone sont exportable automatiquement, pas besoin d exporter TaskListComponent
@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CoreModule,
    TaskListComponent
  ]
})
export class TasklistModule { }
