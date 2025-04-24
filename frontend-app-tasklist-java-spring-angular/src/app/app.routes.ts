import { Routes } from '@angular/router';
import { HomeComponent} from  './home/home.component';
import { AgendaComponent} from  './agenda/agenda.component';
import { TaskListComponent} from  './task-list/task-list.component';

export const routes: Routes = [
    {
      path: '',
      loadChildren: () => import('./features/features.module')
            .then(m => m.FeaturesModule)
    },
    { path: '**', redirectTo: '/' }// Redirige les erreurs 404 vers Home
  ];
