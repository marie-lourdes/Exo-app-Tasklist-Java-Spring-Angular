import { NgModule } from '@angular/core';
import {Routes } from '@angular/router';

export const featuresRoutes: Routes = [
   {
      path: '',
      loadChildren: () => import('./home/home.routes')
        .then(m => m.homeRoutes)
    },
    {
      path: 'agenda',
      loadChildren: () => import('./agenda/agenda.routes')
        .then(m => m.agendaRoutes)
    },
    {
      path: 'tasks',
      loadChildren: () => import('./task-list/tasks.routes')
        .then(m => m.tasksRoutes)
    }

  ];
