import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { SocialLoginModule,AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider,FacebookLoginProvider } from 'angularx-social-login';

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

import { CoreRoutingModule } from './core-routing.module';
import { RegisterComponent } from './componets/membership/register/register.component';
import { LoginComponent } from './componets/membership/login/login.component';
import { EventsComponent } from './componets/membership/events/events.component';
import { EventService } from './componets/membership/event.service';
import { AuthGuard } from './componets/membership/auth.guard';
import { TokenInterceptorService} from './componets/membership/token-interceptor.service';
import { SocialRegisterComponent } from './componets/membership/register/social-register/social-register.component';
import { UserpageComponent } from './componets/membership/userpage/userpage.component';
import { ControlComponent } from './componets/membership/control/control.component';

const PROVIDER_ID : string = "287082486827-0junp0td4ajs1c5p0381topvh168o6l5.apps.googleusercontent.com"; //진범 localhost 승인

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(PROVIDER_ID)
  }
  ]);

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    EventsComponent,
    SocialRegisterComponent,
    UserpageComponent,
    ControlComponent
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
    SocialLoginModule.initialize(config)//refer angularx-sicial-login.umd.js
  ],
  providers: [
    EventService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    },

    /**
     * need to use Google API client id
     * to communicate with backend server.
     * Register the client id into to angular Injector with provider.
     */
    {
      provide : "GOOGLE PROVIDER ID",
      useValue : PROVIDER_ID
    }
  ],
  // exports:[HeaderContainerComponent]
})
export class CoreModule { }
