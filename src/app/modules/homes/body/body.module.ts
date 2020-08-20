import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationModule} from '../../communications/communication.module';
import { SearchModule } from '../../homes/body/search/search.module';
import { SpecialsModule } from '../../homes/body/specials/specials.module';
import { SearchBarComponent } from './search/search-bar/search-bar.component';
import { BodyContainerComponent } from './body-container/body-container.component';
import { BodyRoutingModule } from "./body-routing.module";

@NgModule({
  declarations: [
    // SearchBarComponent
  BodyContainerComponent
],
  imports: [
    CommonModule,
    SearchModule,
    SpecialsModule,
    CommunicationModule,
    BodyRoutingModule
  ],
  exports: [
    // SearchResultComponent,
    SearchBarComponent
  ]
})
export class BodyModule { }
