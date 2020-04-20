import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderContainerComponent } from './containers/header-container/header-container.component';
//import { NavComponent } from '../homes/nav/nav.component';

// import { FiltersComponent } from './componets/filters/filters.component';

import { RegisterComponent } from './componets/membership/register/register.component';
import { LoginComponent } from './componets/membership/login/login.component';
import { EventsComponent} from './componets/membership/events/events.component';
import { AuthGuard } from './componets/membership/auth.guard';
import { SocialRegisterComponent } from './componets/membership/register/social-register/social-register.component';
import { UserpageComponent } from './componets/membership/userpage/userpage.component';

const routes: Routes = [
    {
      path : '',
      component : HeaderContainerComponent
    },
    { path: 'register',
      component: RegisterComponent,     
      canLoad : [AuthGuard]

    },
    {
      path: 'socReg',
      component : SocialRegisterComponent,
      canLoad : [AuthGuard]
    },
    { path: 'login',
      component: LoginComponent,
      canLoad : [AuthGuard]
    },
    { path: 'event',
      component: EventsComponent,
      canActivate: [AuthGuard]
    },
    { path : 'userpage',
      component : UserpageComponent
    },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
