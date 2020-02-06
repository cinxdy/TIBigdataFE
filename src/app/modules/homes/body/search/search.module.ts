import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';

import { ChosenDocAnalysis } from './chosen-doc-analysis/chosen-doc-analysis.component';
import { FreqAnalysisComponent } from './freq-analysis/freq-analysis.component';
import { SearchRoutingModule } from './search-routing.module';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchNavComponent } from './search-nav/search-nav.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { ArticleDetailsComponent } from './article/article-details/article-details.component';

// import {} from './article/'
@NgModule({
  declarations: [
    SearchResultComponent,
    SearchNavComponent,
    SearchFilterComponent,
    ArticleDetailsComponent,
    FreqAnalysisComponent,
    ChosenDocAnalysis

  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    FormsModule
  ],
  exports: [
    SearchResultComponent
  ]
})
export class SearchModule { }
