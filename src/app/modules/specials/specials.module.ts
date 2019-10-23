import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirstComponent } from './containers/first/first.component';
import { SpecialsRoutingModule } from './specials-routing.module';

@NgModule({
  declarations: [
    FirstComponent
  ],
  imports: [
    SpecialsRoutingModule,
    CommonModule
  ],
  exports: [FirstComponent]
})
export class SpecialsModule { }
