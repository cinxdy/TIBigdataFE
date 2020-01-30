import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialsRoutingModule } from './specials-routing.module';
import { FirstComponent } from './containers/first/first.component';

@NgModule({
  declarations: [
    FirstComponent,
  ],
  imports: [
    SpecialsRoutingModule,
    CommonModule
  ],
  exports: [FirstComponent]
})
export class SpecialsModule { }
