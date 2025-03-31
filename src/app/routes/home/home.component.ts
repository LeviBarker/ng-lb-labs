import {Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Auth, GoogleAuthProvider, signInWithPopup} from '@angular/fire/auth';
import {LoginStore} from '../../slices/login/login.store';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [MatToolbar, MatButton, MatIcon, MatIconButton, JsonPipe],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

  auth = inject(Auth);
  loginStore = inject(LoginStore);

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
