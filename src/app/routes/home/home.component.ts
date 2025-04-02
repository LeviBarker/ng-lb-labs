import {Component, inject} from '@angular/core';
import {LoginStore} from '../../slices/login/login.store';
import {JsonPipe} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';
import {Router} from '@angular/router';
import {visibleRoutes} from '../../app.routes';

@Component({
  selector: 'app-home',
  imports: [JsonPipe, MatCard, MatCardContent, MatDivider, MatButton, MatIcon, MatCardHeader],
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
