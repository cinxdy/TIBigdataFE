
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeListContainerComponent } from './containers/home-list-container/home-list-container.component';

import { QuerytestComponent } from './containers/querytest/querytest.component';

import { FlaskComponent } from './containers/flask/flask.component';


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
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomesRoutingModule { }
