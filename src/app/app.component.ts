import {Component, inject, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Auth} from '@angular/fire/auth';
import {LoginStore} from './slices/login/login.store';
import {patchState} from '@ngrx/signals';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'ng-lb-labs';

  auth = inject(Auth);
  loginStore = inject(LoginStore);

  ngOnInit() {
    this.auth.onAuthStateChanged((user) => {
      patchState(this.loginStore, () => ({user}))
    })
  }
}
