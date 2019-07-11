import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { HttpModule} from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './modules/core/core.module';
import { HomesModule } from './modules/homes/homes.module';

import { D3Service,  } from './d3/d3.service';
import { D3_DIRECTIVES  } from './d3/directives/';

import { GraphComponent} from './visuals/graph/graph.component';
import { SHARED_VISUALS} from './visuals/shared';


@NgModule({
  declarations: [
    AppComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    HttpModule,

  ],
  providers: [D3Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
