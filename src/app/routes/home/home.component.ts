import {Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {Auth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from '@angular/fire/auth';
import {LoginStore} from '../../slices/login/login.store';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {bufferCount, fromEvent, map} from 'rxjs';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatDivider} from '@angular/material/divider';

@Component({
  selector: 'app-home',
  imports: [MatToolbar, MatButton, MatIcon, JsonPipe, AsyncPipe, MatCard, MatCardContent, MatDivider],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {

  auth = inject(Auth);
  loginStore = inject(LoginStore);

  pressedKeys$ = fromEvent<KeyboardEvent>(window, 'keydown').pipe(
    map((event) => event.key),
    bufferCount(10),
    map((keys) => keys.join(','))
  )

  secretCodeEntered$ = this.pressedKeys$.pipe(
    map((keys) => keys == 'ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,a,b')
  )

  async continueWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
    } catch (err) {
      console.error(err);
    }
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (err) {
      console.error(err);
    }
  }

  async logOut() {
    await this.auth.signOut();
  }
}
