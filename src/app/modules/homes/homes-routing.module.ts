
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeListContainerComponent } from './containers/home-list-container/home-list-container.component';

import { QuerytestComponent } from './containers/querytest/querytest.component';

import { FlaskComponent } from './containers/flask/flask.component';
import { SearchResultComponent } from './containers/search-result/search-result.component';
import { AnalysisComponent } from './containers/search-result/analysis/analysis.component';


const routes: Routes = [
    { path: '',
      component: HomeListContainerComponent,
    },
    {
        path: 'library',
        component: HomeListContainerComponent,
        
    },

    {
      path:'querytest',
            component: QuerytestComponent
    },

    {
      path:'flask',
            component: FlaskComponent
    },
    {
      path:'searchResult',
            component: SearchResultComponent
    },
    {
      path:'analysis',
        component: AnalysisComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomesRoutingModule { }
