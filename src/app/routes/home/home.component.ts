import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';
import { visibleRoutes } from '../../app.routes';
import { LoginStore } from '../../slices/login/login.store';

@Component({
  selector: 'app-home',
  imports: [MatCard, MatCardContent, MatButton, MatIcon, MatCardHeader],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  loginStore = inject(LoginStore)
  router = inject(Router)

  visibleRoutes = visibleRoutes

  async open(path: string) {
    await this.router.navigate([path]);
  }
}
