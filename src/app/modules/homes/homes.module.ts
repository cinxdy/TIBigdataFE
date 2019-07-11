import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeListContainerComponent } from './containers/home-list-container/home-list-container.component';
import { HomesRoutingModule } from './homes-routing.module';
import { CoreModule } from '../core/core.module';

import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';

import { D3Service,  } from '../../d3/d3.service';
import { D3_DIRECTIVES  } from '../../d3/directives/';

import { GraphComponent} from '../../visuals/graph/graph.component';
import { SHARED_VISUALS} from '../../visuals/shared';

@NgModule({
  declarations: [
    HomeListContainerComponent,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES
  ],
  imports: [
    CommonModule,
    HomesRoutingModule,
    CoreModule,
    FormsModule,
    HttpModule,

  ],
  providers: [
    D3Service
  ],
  exports:[HomeListContainerComponent]
})
export class HomesModule { }
