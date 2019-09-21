import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderContainerComponent } from './containers/header-container/header-container.component';
import { NavComponent } from './componets/nav/nav.component';

import { FiltersComponent } from './componets/filters/filters.component';

@NgModule({
  declarations: [
    HeaderContainerComponent, 
    NavComponent, 
    FiltersComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[HeaderContainerComponent]
})
export class CoreModule { }
