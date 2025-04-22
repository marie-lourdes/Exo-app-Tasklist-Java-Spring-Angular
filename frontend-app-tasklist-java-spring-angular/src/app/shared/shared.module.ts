import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadSpinnerComponent } from './components/load-spinner/load-spinner.component';

@NgModule({
 /* declarations: [
    LoadSpinnerComponent
  ],*/
  imports: [
    CommonModule,
    LoadSpinnerComponent
  ],
  exports: [
     CommonModule,
    // Exporté pour être utilisé par d'autres modules comme AgendaModule et HomeModule
    LoadSpinnerComponent
  ]
})
export class SharedModule { }
