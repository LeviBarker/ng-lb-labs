import {Component, inject, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Auth, GoogleAuthProvider, signInWithPopup} from '@angular/fire/auth';
import {LoginStore} from './slices/login/login.store';
import {patchState} from '@ngrx/signals';
import {MatToolbar} from "@angular/material/toolbar";
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButton, MatIcon, MatToolbar, MatIconButton],
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
      patchState(this.loginStore, () => ({user, isLoading: false}))
    })
  }

  async continueWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
    } catch (err) {
      console.error(err);
    }
  }

  async logOut() {
    await this.auth.signOut();
  }
}
