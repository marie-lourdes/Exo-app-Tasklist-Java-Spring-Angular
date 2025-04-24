import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda.component';

const routes: Routes = [
  {
    path: '',  // chemin vide car 'tasklist' est déjà défini dans le parent featuresroutes
    component: AgendaComponent

    }
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class AgendaRoutingModule { }
