import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/features.routes').then(m => m.featuresRoutes),
  },
  { path: '**', redirectTo: '/' }, // Redirige les erreurs 404 vers Home
];
