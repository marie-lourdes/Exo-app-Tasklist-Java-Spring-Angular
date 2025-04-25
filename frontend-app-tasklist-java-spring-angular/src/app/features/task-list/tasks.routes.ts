import {Routes } from '@angular/router';
import { TaskListComponent  } from './task-list.component';

export const tasksRoutes: Routes = [
  {
    path: '',  // chemin vide car 'tasklist' est déjà défini dans le parent featuresroutes
    component: TaskListComponent

    }
  ];
