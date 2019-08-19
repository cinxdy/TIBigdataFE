
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeListContainerComponent } from './containers/home-list-container/home-list-container.component';
import { ParserContainerComponent} from './containers/parser-container/parser-container.component';
import { QuerytestComponent } from './containers/querytest/querytest.component';

const routes: Routes = [
    {
        path: 'library',
        component: HomeListContainerComponent,
        
    },
    {
      path:'parser',
            component: ParserContainerComponent
    },
    {
      path:'querytest',
            component: QuerytestComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomesRoutingModule { }
