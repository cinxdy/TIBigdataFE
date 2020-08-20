import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainHomeContainerComponent } from './modules/homes/body/main-home-container/main-home-container.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component : MainHomeContainerComponent
  // },
  // {
  //   path: 'homes',
  //   component : MainHomeContainerComponent
  // }, 
  {
    path: 'body',
    loadChildren : ()=> import('./modules/homes/body/body.module').then(m => m.BodyModule)
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
