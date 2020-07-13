import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityRootComponent} from './community-root/community-root.component';
import { CommunityComponent } from './community/community.component';
const routes: Routes = [
  {
    path : "",
    component : CommunityRootComponent,
    children : [
      {
        path :"",
        component : CommunityComponent
      }
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityRoutingModule { }
