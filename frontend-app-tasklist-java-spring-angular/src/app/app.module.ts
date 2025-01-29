import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent} from './app.component';
import { HomeComponent} from  './home/home.component';
import {TaskListComponent} from  './task-list/task-list.component';
// pour ngModel
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskListComponent
    ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
