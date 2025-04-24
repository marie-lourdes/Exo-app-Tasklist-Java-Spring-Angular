import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
 /* declarations: [// composant non standalone

    ],*/
  imports: [
    SharedModule,
    HomeRoutingModule,
    HomeComponent,

    //TaskListComponent, //  import composant standalone(standalone  par defaut avec la nouvelle version angular)*/
  ]
})
export class HomeModule { }
