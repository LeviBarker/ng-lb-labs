import {Component, inject} from '@angular/core';
import {Auth, GoogleAuthProvider, signInWithPopup} from '@angular/fire/auth';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-unauthenticated',
  imports: [
    MatButton
  ],
  standalone: true,
  templateUrl: './unauthenticated.component.html',
  styleUrl: './unauthenticated.component.css'
})
export class UnauthenticatedComponent {
  private auth = inject(Auth);
  private router = inject(Router);

  async continueWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(this.auth, provider);
      if(userCredential) {
        await this.router.navigate(['/']);
      }
    } catch (err) {
      console.error(err);
    }
  }
}
