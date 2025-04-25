import {Routes } from '@angular/router';
import { AgendaComponent } from './agenda.component';

export const agendaRoutes: Routes = [
  {
    path: '',  // chemin vide car 'tasklist' est déjà défini dans le parent featuresroutes
    component: AgendaComponent

    }
  ];
