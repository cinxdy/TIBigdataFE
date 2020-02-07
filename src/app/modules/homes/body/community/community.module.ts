import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityRootComponent } from './community-root/community-root.component';


@NgModule({
  declarations: [CommunityRootComponent],
  imports: [
    CommonModule,
    CommunityRoutingModule
  ]
})
export class CommunityModule { }
