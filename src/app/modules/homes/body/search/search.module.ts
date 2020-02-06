import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchRoutingModule } from './search-routing.module';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchNavComponent } from './search-nav/search-nav.component';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { ArticleDetailsComponent } from './article/article-details/article-details.component';
import {FormsModule} from '@angular/forms';

// import {} from './article/'
@NgModule({
  declarations: [
    SearchResultComponent,
    SearchNavComponent,
    SearchFilterComponent,
    ArticleDetailsComponent

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
