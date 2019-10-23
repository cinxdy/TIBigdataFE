import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'homes',
    loadChildren: './modules/homes/homes.module#HomesModule'
  },
  {
    path: 'specials',
    loadChildren: './modules/specials/specials.module#SpecialsModule'
  },
 
 

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
