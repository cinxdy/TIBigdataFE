import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: './modules/homes/homes.module#HomesModule'
  },
  {
    path: 'homes',
    loadChildren: './modules/homes/homes.module#HomesModule'
  },
  {
    path: 'specials',
    loadChildren: './modules/specials/specials.module#SpecialsModule'
  },
  {
    path: 'membership',
    loadChildren: './modules/core/core.module#CoreModule'
  },
 
 

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
