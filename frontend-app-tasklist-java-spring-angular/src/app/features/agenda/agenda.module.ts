import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda.component';
import { ModalComponent } from './modal/modal.component';
import { SharedModule } from '../../shared/shared.module';
import { AgendaService } from './services/agenda.service';
// Si agenda réutilise des éléments partagés

@NgModule({
/*  declarations: [

  ],*/
  imports: [
    SharedModule,
    AgendaComponent,// Composant principal de l'agenda
    ModalComponent // Le modal de l'agenda
  ],
  exports: [
    AgendaComponent // Si l'agenda doit être utilisé ailleurs
  ],
  providers: [
    AgendaService
  ]
})
export class AgendaModule { }
