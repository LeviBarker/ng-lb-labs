import {Routes} from '@angular/router';
import {HomeComponent} from './routes/home/home.component';
import {NotFoundComponent} from './routes/not-found/not-found.component';
import {UnauthenticatedComponent} from './routes/unauthenticated/unauthenticated.component';
import {alreadyAuthenticatedCanActivate, authGuard} from './routes/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: UnauthenticatedComponent,
    canActivate: [alreadyAuthenticatedCanActivate]
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
