import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { SubjectService } from './slices/subject/subject.service';
import { LoginStore } from './slices/login/login.store';
import { SubjectStore } from './slices/subject/subject.store';
import { patchState } from '@ngrx/signals';
import {Subject} from './models/subject';
import {RouterOutlet} from '@angular/router';
import {MatToolbar} from '@angular/material/toolbar';
import {MatIcon} from '@angular/material/icon';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbar,
    MatIcon,
    MatButton
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-lb-labs';
  private readonly auth = inject(Auth);
  private readonly subjectService = inject(SubjectService);
  protected readonly loginStore = inject(LoginStore);
  private readonly subjectStore = inject(SubjectStore);
  private readonly subscriptions = new Subscription();

  private static readonly googleAuthProvider = new GoogleAuthProvider();

  ngOnInit() {
    this.handleAuthStateChange();
  }

  ngOnDestroy() {
    this.cleanupSubscriptions();
  }

  async continueWithGoogle() {
    try {
      await signInWithPopup(this.auth, AppComponent.googleAuthProvider);
    } catch (error) {
      console.error('Error logging in with Google:', error);
    }
  }

  async logOut() {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  private handleAuthStateChange(): void {
    this.auth.onAuthStateChanged(user => {
      patchState(this.loginStore, () => ({ user, isLoading: false }));
      if(user) {
        this.loadSubjects()
      }
    });
  }

  private loadSubjects(): void {
    const subscription = this.subjectService.getAll().subscribe(subjectArray => {
      const subjectMap = subjectArray.reduce((map, subject) => {
        if (subject?.id) {
          map[subject.id] = subject;
        }
        return map;
      }, {} as Record<string, Subject>);

      patchState(this.subjectStore, () => ({ subjects: subjectMap }));
    });

    this.subscriptions.add(subscription);
  }

  private cleanupSubscriptions(): void {
    this.subscriptions.unsubscribe();
  }
}
