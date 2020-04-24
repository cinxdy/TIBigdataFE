import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { NavComponent } from '../homes/nav/nav.component';

// import { FiltersComponent } from './componets/filters/filters.component';

import { RegisterComponent } from './componets/membership/register/register.component';
import { LoginComponent } from './componets/membership/login/login.component';
import { EventsComponent} from './componets/membership/events/events.component';
import { AuthGuard } from './componets/membership/auth.guard';
import { SocialRegisterComponent } from './componets/membership/register/social-register/social-register.component';
import { UserpageComponent } from './componets/membership/userpage/userpage.component';
import { ControlComponent } from './componets/membership/control/control.component';

const routes: Routes = [
    // {
    //   path : '',
    //   component : HeaderContainerComponent
    // },add : redirect to main page
    { path: 'register',
      component: RegisterComponent,     
      canActivate : [AuthGuard]

    },
    {
      path: 'socReg',
      component : SocialRegisterComponent,
      canActivate : [AuthGuard]
    },
    { path: 'login',
      component: LoginComponent,
      canActivate : [AuthGuard]
    },
    { path: 'event',
      component: EventsComponent,
      canActivate: [AuthGuard]
    },
    { path : 'userpage',
      component : UserpageComponent
    },
    {
      path : 'control',
      component : ControlComponent
    }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
