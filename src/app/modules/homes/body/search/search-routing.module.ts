import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SearchResultComponent } from "./search-result/search-result.component";
import { FreqAnalysisComponent } from "./freq-analysis/freq-analysis.component";
import { ChosenDocAnalysisComponent } from "./chosen-doc-analysis/chosen-doc-analysis.component";
import { SearchComponent } from "./search/search.component";

const routes: Routes = [
  {
    path: "",
    component: SearchComponent,
    children: [
      {
        path: "",
        component: SearchResultComponent
      },
      {
        path: "freqAnalysis",
        component: FreqAnalysisComponent
      },
      {
        path: "ChosenDocAnalysis",
        component: ChosenDocAnalysisComponent
      }
    ]
  }
  // {
  //   path: "homes/searchResult",
  //   component: SearchResultComponent,

  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchRoutingModule {}
