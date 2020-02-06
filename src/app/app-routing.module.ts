import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainHomeContainerComponent } from './modules/homes/body/main-home-container/main-home-container.component';

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
  }
  // {
  //   path: 'specials',
  //   loadChildren: () => import('./modules/specials/specials.module').then(m => m.SpecialsModule)
  // },
  // {
  //   path: 'membership',
  //   loadChildren: () => import('./modules/core/core.module').then(m => m.CoreModule)
  // },
 
 

  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
