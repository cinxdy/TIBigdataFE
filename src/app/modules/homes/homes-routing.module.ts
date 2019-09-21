
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeListContainerComponent } from './containers/home-list-container/home-list-container.component';
import { ParserContainerComponent} from './containers/parser-container/parser-container.component';
import { QuerytestComponent } from './containers/querytest/querytest.component';
import { LineChartComponent } from './containers/line-chart/line-chart.component';
import { FlaskComponent } from './containers/flask/flask.component';


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
    },
    {
      path:'line-chart',
            component: LineChartComponent
    },
    {
      path:'flask',
            component: FlaskComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomesRoutingModule { }
