import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TasklistComponent } from './task-list.component';

const routes: Routes = [
  {
    path: '',  // chemin vide car 'tasklist' est déjà défini dans le parent featuresroutes
    component: TasklistComponent

    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TasklistRoutingModule { }
