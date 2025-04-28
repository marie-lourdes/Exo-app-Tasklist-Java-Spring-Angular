import { Routes } from '@angular/router';
import { HomeComponent } from './home.component';

export const homeRoutes: Routes = [
  {
    path: '', // chemin vide car 'tasklist' est déjà défini dans le parent featuresroutes
    component: HomeComponent,
  },
];
