import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { TagCloudModule } from 'angular-tag-cloud-module';

import { IdControlService } from './id-control-service/id-control.service';

import { ChosenDocAnalysisComponent } from './chosen-doc-analysis/chosen-doc-analysis.component';
import { FreqAnalysisComponent } from './freq-analysis/freq-analysis.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { ArticleDetailsComponent } from './article/article-details/article-details.component';
import { SearchRootComponent } from './search-root/search-root.component';
import { SearchDetailComponent } from './search-detail/search-detail.component';

// import {} from './article/'
@NgModule({
  declarations: [
    SearchResultComponent,
    SearchBarComponent,
    SearchFilterComponent,
    ArticleDetailsComponent,
    FreqAnalysisComponent,
    ChosenDocAnalysisComponent,
    SearchRootComponent,
    SearchDetailComponent,

  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    TagCloudModule

  ],
  providers :[
    IdControlService
  ],
  exports: [
    SearchResultComponent
  ]
})
export class SearchModule { }
