import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialsRoutingModule } from './specials-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpecialsRootComponent } from './specials-root/specials-root.component';

@NgModule({
  declarations: [
    DashboardComponent,
    SpecialsRootComponent
  ],
  imports: [
    SpecialsRoutingModule,
    CommonModule
  ],
  // exports: [DashboardComponent]
})
export class SpecialsModule { }
