import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { SocialLoginModule,AuthServiceConfig } from 'angular4-social-login';
import { GoogleLoginProvider,FacebookLoginProvider } from 'angular4-social-login';


//For Online video lecture
import { 
  MatToolbarModule,
  MatFormFieldModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatTableModule,
  MatDividerModule,
  MatSnackBarModule } from '@angular/material';

import { HeaderContainerComponent } from './containers/header-container/header-container.component';
import { NavComponent } from './componets/nav/nav.component';
import { FiltersComponent } from './componets/filters/filters.component';
import { CoreRoutingModule } from './core-routing.module';
import { RegisterComponent } from './componets/membership/register/register.component';
import { LoginComponent } from './componets/membership/login/login.component';
import { EventsComponent } from './componets/membership/events/events.component';
import { EPAuthService } from './componets/membership/auth.service';
import { EventService } from './componets/membership/event.service';
import { AuthGuard } from './componets/membership/auth.guard';
import { TokenInterceptorService} from './componets/membership/token-interceptor.service';


let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("1075125101450-9ji2fdcpdev4jf7sqv6en8vg3cp8irfi.apps.googleusercontent.com") 
  //ex client Id:- 957178873235f2vyuit3q02hjm0d0sgntj3ttamuqr3cg2t.apps.googleuserconte.com
  }
  ]);

@NgModule({
  declarations: [
    HeaderContainerComponent, 
    NavComponent, 
    FiltersComponent,
    RegisterComponent,
    LoginComponent,
    EventsComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    CoreRoutingModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule,
    SocialLoginModule.initialize(config)
  ],
  providers: [
    EPAuthService,
    EventService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  exports:[HeaderContainerComponent]
})
export class CoreModule { }
