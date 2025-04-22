import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { ApiTaskService } from './services/api-task.service';
import { TaskService } from './services/task.service';
//ajout routermodule pour les directive router link dans le headercomponent

@NgModule({
  declarations: [
    HeaderComponent, // Composant global
    ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent, // Exporté pour être réutilisé directement dans AppComponent
  ],
  providers: [
    // Services globaux
    TaskService,
    ApiTaskService,
  ]
})
export class CoreModule { }
