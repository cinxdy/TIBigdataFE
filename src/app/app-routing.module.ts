import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainHomeContainerComponent } from './modules/homes/body/main-home-container/main-home-container.component';
// import {AuthGuard } from './modules/core/componets/membership/auth.guard';

const routes: Routes = [
  {
    path: '',
    component : MainHomeContainerComponent
  },
  {
    path: 'homes',
    component : MainHomeContainerComponent
  },
  {
    path: 'search',
    loadChildren : ()=> import('./modules/homes/body/search/search.module').then(m => m.SearchModule)
  },
  {
    path: 'specials',
    loadChildren : ()=> import('./modules/homes/body/specials/specials.module').then(m => m.SpecialsModule)
  },
  {
    path : 'library',
    loadChildren : ()=> import('./modules/homes/body/library/library.module').then(m => m.LibraryModule)
  },
  // {
  //   path: 'specials',
  //   loadChildren: () => import('./modules/specials/specials.module').then(m => m.SpecialsModule)
  // },
  {
    path: 'membership',
    loadChildren: () => import('./modules/core/core.module').then(m => m.CoreModule),
    // canLoad : [AuthGuard]
  },
 
 

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
