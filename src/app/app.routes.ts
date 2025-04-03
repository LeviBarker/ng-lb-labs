import {Routes} from '@angular/router';
import {HomeComponent} from './routes/home/home.component';
import {NotFoundComponent} from './routes/not-found/not-found.component';
import {authGuard} from './routes/auth.guard';
import {HomeschoolComponent} from './routes/homeschool/homeschool.component';
import {SubjectDetailComponent} from './routes/subject-detail/subject-detail.component';

export const routes: Routes = [
  {
    path: 'homeschool',
    component: HomeschoolComponent,
    canActivate: [authGuard],
  },
  {
    path: 'homeschool/subject/:id',
    component: SubjectDetailComponent,
    canActivate: [authGuard],
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
