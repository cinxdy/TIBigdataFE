import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LibraryRootComponent} from './library-root/library-root.component';
import {CategoryComponent} from './category/category.component';

const routes: Routes = [
  {
    path : "",
    component : LibraryRootComponent,
    children:[
      {
        path : "",
        component : CategoryComponent
      },
      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LibraryRoutingModule { }
