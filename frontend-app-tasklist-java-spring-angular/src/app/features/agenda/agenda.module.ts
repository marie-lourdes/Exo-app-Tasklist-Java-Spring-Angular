import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgendaComponent } from './agenda.component';
import { ModalComponent } from './modal/modal.component';
import { SharedModule } from '../../shared/shared.module';
import { AgendaService } from './services/agenda.service';
import { AgendaRoutingModule } from './agenda-routing.module';


@NgModule({
/*  declarations: [

  ],*/
  imports: [
    SharedModule,
    AgendaRoutingModule
    AgendaComponent,// Composant principal de l'agenda
    ModalComponent // Le modal de l'agenda
  ],
  providers: [
    AgendaService
  ]
})
export class AgendaModule { }
