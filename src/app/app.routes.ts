import {Routes} from '@angular/router';
import {HomeComponent} from './routes/home/home.component';
import {NotFoundComponent} from './routes/not-found/not-found.component';
import {authGuard} from './routes/auth.guard';
import {HomeschoolComponent} from './routes/homeschool/homeschool.component';
import {SubjectDetailComponent} from './routes/subject-detail/subject-detail.component';
import {PersonalDashboardComponent} from './routes/personal-dashboard/personal-dashboard.component';
import {HomeschoolListComponent} from './routes/homeschool-list/homeschool-list.component';

export const routes: Routes = [
  {
    path: 'homeschool',
    component: HomeschoolListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'homeschool/add',
    component: HomeschoolComponent,
    canActivate: [authGuard],
  },
  {
    path: 'homeschool/subject/:id',
    component: SubjectDetailComponent,
    canActivate: [authGuard],
  },
  {
    path: 'personal-dashboard',
    component: PersonalDashboardComponent,
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

export interface VisibleRoute {
  title: string;
  path: string;
  protected?: boolean;
}

export const visibleRoutes: VisibleRoute[] = [
  {
    title: 'Homeschool App',
    path: './homeschool',
    protected: true
  },
  {
    title: '404 Page',
    path: './fake-page'
  }
]
