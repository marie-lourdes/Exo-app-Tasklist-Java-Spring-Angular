import { Routes } from '@angular/router';
import { HomeComponent} from  './home/home.component';
import { AgendaComponent} from  './agenda/agenda.component';

export const routes: Routes = [
    {  path: '', component: HomeComponent},
    {  path: 'agenda', component: AgendaComponent},
  ];
