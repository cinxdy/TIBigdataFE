import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialsRoutingModule } from './specials-routing.module';
import { FirstComponent } from './containers/first/first.component';
import { SecondComponent } from './containers/second/second.component';
//import { DashboardComponent } from './containers/second/dashboard/dashboard.component';

@NgModule({
  declarations: [
    FirstComponent,
    SecondComponent
   // DashboardComponent
  ],
  imports: [
    SpecialsRoutingModule,
    CommonModule
  ],
  exports: [FirstComponent, SecondComponent]
})
export class SpecialsModule { }
