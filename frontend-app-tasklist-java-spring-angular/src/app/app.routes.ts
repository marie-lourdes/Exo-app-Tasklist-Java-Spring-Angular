import { Routes } from '@angular/router';
import { HomeComponent} from  './home/home.component';
import { AgendaComponent} from  './agenda/agenda.component';
import { TaskListComponent} from  './task-list/task-list.component';

export const routes: Routes = [
    {  path: '', component: HomeComponent},
    {  path: 'tasks', component: TaskListComponent},
    {  path: 'agenda', component: AgendaComponent},
    { path: '**', redirectTo: '/' }, // Redirige les erreurs 404 vers Home

  ];
