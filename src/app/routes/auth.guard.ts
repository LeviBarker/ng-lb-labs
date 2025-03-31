import {CanActivateFn} from '@angular/router';
import {inject, Injectable} from '@angular/core';
import {Auth} from '@angular/fire/auth';
import {ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Router} from '@angular/router';

@Injectable({providedIn: 'root'})
export class AuthGuardService {
  constructor(private auth: Auth, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }

  alreadyAuthenticatedCanActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          this.router.navigate(['/']);
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });
  }
}

export const authGuard: CanActivateFn = (route, state) => {
  const authService = new AuthGuardService(inject(Auth), inject(Router));
  return authService.canActivate(route, state);
};

export const alreadyAuthenticatedCanActivate: CanActivateFn = (route, state) => {
  const authService = new AuthGuardService(inject(Auth), inject(Router));
  return authService.alreadyAuthenticatedCanActivate(route, state);
};
