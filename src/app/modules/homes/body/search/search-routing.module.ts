import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchResultComponent } from './search-result/search-result.component';
import { FreqAnalysisComponent } from './freq-analysis/freq-analysis.component';
import { ChosenDocAnalysisComponent } from './chosen-doc-analysis/chosen-doc-analysis.component';


const routes: Routes = [
  {
    path : "",
    component : SearchResultComponent
  },
  {
    path : "homes/searchResult",
    component : SearchResultComponent
  },
  {
    path : "homes/searchResult/freqAnalysis",
    component : FreqAnalysisComponent
  },
  {
    path : "homes/searchResult/ChosenDocAnalysis",
    component : ChosenDocAnalysisComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule { }
