import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const featuresRoutes: Routes = [
   {
      path: '',
      loadChildren: () => import('./home/home.module')
        .then(m => m.HomeModule)
    },
    {
      path: 'agenda',
      loadChildren: () => import('./agenda/agenda.module')
        .then(m => m.AgendaModule)
    },
    {
      path: 'tasks',
      loadChildren: () => import('./task-list/tasklist.module')
        .then(m => m.TaskListModule)
    }

  ];

@NgModule({
  imports: [RouterModule.forChild(featuresRoutes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
