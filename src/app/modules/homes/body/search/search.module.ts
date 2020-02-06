import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { TagCloudModule } from 'angular-tag-cloud-module';


import { ChosenDocAnalysisComponent } from './chosen-doc-analysis/chosen-doc-analysis.component';
import { FreqAnalysisComponent } from './freq-analysis/freq-analysis.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchNavComponent } from './search-nav/search-nav.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { ArticleDetailsComponent } from './article/article-details/article-details.component';
import { SearchComponent } from './search/search.component';

// import {} from './article/'
@NgModule({
  declarations: [
    SearchResultComponent,
    SearchNavComponent,
    SearchFilterComponent,
    ArticleDetailsComponent,
    FreqAnalysisComponent,
    ChosenDocAnalysisComponent,
    SearchComponent,

  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule,
    TagCloudModule

  ],
  exports: [
    SearchResultComponent
  ]
})
export class SearchModule { }
