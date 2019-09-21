import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeListContainerComponent } from './containers/home-list-container/home-list-container.component';
import { HomesRoutingModule } from './homes-routing.module';
import { CoreModule } from '../core/core.module';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpModule} from '@angular/http';

import { D3Service,  } from '../../d3/d3.service';
import { D3_DIRECTIVES  } from '../../d3/directives/';

import { GraphComponent} from '../../visuals/graph/graph.component';
import { SHARED_VISUALS} from '../../visuals/shared';
import { ParserContainerComponent } from './containers/parser-container/parser-container.component';
import { QuerytestComponent } from './containers/querytest/querytest.component';
import { ArticleDetailsComponent } from './containers/querytest/article/article-details/article-details.component';
import { ShowArticlesComponent } from './containers/querytest/article/show-articles/show-articles.component';
import { LineChartComponent } from './containers/line-chart/line-chart.component';
import { FlaskComponent } from './containers/flask/flask.component';


@NgModule({
  declarations: [
    HomeListContainerComponent,
    ParserContainerComponent,
    GraphComponent,
    ...SHARED_VISUALS,
    ...D3_DIRECTIVES,
    QuerytestComponent,
    ArticleDetailsComponent,
    ShowArticlesComponent,
    LineChartComponent,
    FlaskComponent
   
  ],
  imports: [
    CommonModule,
    HomesRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    TagCloudModule

  ],
  providers: [
    D3Service
  ],
  exports:[HomeListContainerComponent, LineChartComponent]
})
export class HomesModule { }
