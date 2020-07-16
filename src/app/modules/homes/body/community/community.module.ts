import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommunityRoutingModule } from './community-routing.module';
import { CommunityRootComponent } from './community-root/community-root.component';
import { CommunityComponent } from './community/community.component';
import { WriteNewCommunityDocComponent } from './write-new-community-doc/write-new-community-doc.component';
import { ReadCommunityDocComponent } from './read-community-doc/read-community-doc.component';


@NgModule({
  declarations: [CommunityRootComponent, CommunityComponent, WriteNewCommunityDocComponent, ReadCommunityDocComponent],
  imports: [
    CommonModule,
    CommunityRoutingModule
  ]
})
export class CommunityModule { }
