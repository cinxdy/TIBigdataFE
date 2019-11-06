import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeListContainerComponent } from './containers/home-list-container/home-list-container.component';
import { HomesRoutingModule } from './homes-routing.module';
import { CoreModule } from '../core/core.module';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { HttpModule} from '@angular/http';

import { QuerytestComponent } from './containers/querytest/querytest.component';
import { ArticleDetailsComponent } from './containers/querytest/article/article-details/article-details.component';
import { ShowArticlesComponent } from './containers/querytest/article/show-articles/show-articles.component';

import { FlaskComponent } from './containers/flask/flask.component';
import { IssueComponent } from './containers/issue/issue.component';
import { SearchComponent } from './containers/search/search.component';
import { GraphComponent } from './containers/graph/graph.component';
import { FooterComponent } from './containers/footer/footer.component';
import { SearchResultComponent } from './containers/search-result/search-result.component';
import { SearchNavComponent } from './containers/search-nav/search-nav.component';
import { AnalysisComponent } from './containers/search-result/analysis/analysis.component';


@NgModule({
  declarations: [
    HomeListContainerComponent,


    QuerytestComponent,
    ArticleDetailsComponent,
    ShowArticlesComponent,

    FlaskComponent,
    IssueComponent,
    SearchComponent,
    GraphComponent,
    FooterComponent,
    SearchResultComponent,
    SearchNavComponent,
    AnalysisComponent
   
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

  ],
  exports:[HomeListContainerComponent]
})
export class HomesModule { }
