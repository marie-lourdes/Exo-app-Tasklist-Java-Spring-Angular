import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component'
import { AgendaModule } from './agenda/agenda.module'



@NgModule({
  declarations: [
    AppComponent
    ],
  imports: [
    BrowserModule ,
    AgendaModule
  ]
  bootstrap: [AppComponent]
})
export class AppModule { }
