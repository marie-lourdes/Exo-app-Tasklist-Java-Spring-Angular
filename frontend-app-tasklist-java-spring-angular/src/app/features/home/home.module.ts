import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { TaskListComponent } from '../task-list/components/task-list.component';

@NgModule({
 /* declarations: [// composant non standalone

    ],*/
  imports: [
    SharedModule,
    HomeComponent,
    TaskListComponent, //  import composant standalone(standalone  par defaut avec la nouvelle version angular)
  ]
})
export class HomeModule { }
