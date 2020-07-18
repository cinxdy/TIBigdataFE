import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchModule } from './modules/homes/body/search/search.module';
import { SpecialsModule } from './modules/homes/body/specials/specials.module';
import { FooterComponent } from './modules/homes/footer/footer.component';
import { NavComponent } from './modules/homes/nav/nav.component';
import { MainHomeContainerComponent } from './modules/homes/body/main-home-container/main-home-container.component';
import { HomeSearchBarComponent } from './modules/homes/body/main-home-container/home-search-bar/home-search-bar.component';
import { HomeGraphComponent } from './modules/homes/body/main-home-container/home-graph/home-graph.component';
import { TagCloudModule } from 'angular-tag-cloud-module';
import { LibraryModule } from './modules/homes/body/library/library.module';
import { WordcloudService } from './modules/homes/graphs/wordcloud/wordcloud.service';
import { CommunicationModule} from './modules/communications/communication.module';
import { EPAuthService } from './modules/communications/fe-backend-db/membership/auth.service';
import { SearchHistoryComponent } from './modules/homes/body/main-home-container/search-history/search-history.component';
import { AnalysisDatabaseService } from './modules/communications/fe-backend-db/analysis-db/database.service';

import { ChartsModule } from "ng2-charts";


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavComponent,
    MainHomeContainerComponent,
    HomeSearchBarComponent,
    HomeGraphComponent,
    SearchHistoryComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SearchModule,
    SpecialsModule,
    CommunicationModule,
    FormsModule,
    TagCloudModule,
    LibraryModule,
    ChartsModule

  ],
  providers: [WordcloudService, EPAuthService, AnalysisDatabaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
