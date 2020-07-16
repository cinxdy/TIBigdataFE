import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityRootComponent} from './community-root/community-root.component';
import { CommunityComponent } from './community/community.component';
import { WriteNewCommunityDocComponent } from './write-new-community-doc/write-new-community-doc.component';
import { ReadCommunityDocComponent } from "./read-community-doc/read-community-doc.component";
const routes: Routes = [
  {
    path : "",
    component : CommunityRootComponent,
    children : [
      {
        path :"",
        component : CommunityComponent
      },
      {
        path :"newDoc",
        component : WriteNewCommunityDocComponent
      },
      {
        path :"readDoc",
        component :ReadCommunityDocComponent
      }
        
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
