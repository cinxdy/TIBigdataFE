
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpecialsRootComponent } from './specials-root/specials-root.component';

const routes: Routes = [
  {
    path:"",
    component : SpecialsRootComponent,
    children:[
      { path: 'dashboard',
        component: DashboardComponent,
      }

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SpecialsRoutingModule { }
