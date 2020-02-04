import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HeaderContainerComponent } from './containers/header-container/header-container.component';
import { NavComponent } from '../homes/nav/nav.component';

// import { FiltersComponent } from './componets/filters/filters.component';

import { RegisterComponent } from './componets/membership/register/register.component';
import { LoginComponent } from './componets/membership/login/login.component';
import { EventsComponent} from './componets/membership/events/events.component';
import { AuthGuard } from './componets/membership/auth.guard';

const routes: Routes = [
 
    { path: 'register',
      component: RegisterComponent,
      
    },
    { path: 'login',
      component: LoginComponent,
    },
    { path: 'event',
      component: EventsComponent,
      canActivate: [AuthGuard]
    },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
