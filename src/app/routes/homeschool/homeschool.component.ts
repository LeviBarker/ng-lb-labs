import {Component, inject, signal} from '@angular/core';
import {Router} from '@angular/router';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {Subject} from '../../models/subject';
import {AsyncPipe, DatePipe, JsonPipe} from '@angular/common';
import {SubjectService} from '../../slices/subject/subject.service';
import {MatToolbar} from '@angular/material/toolbar';
import {MatTooltip} from '@angular/material/tooltip';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {SubjectStore} from '../../slices/subject/subject.store';

@Component({
  selector: 'app-homeschool',
  imports: [
    MatButton,
    MatIcon,
    MatCard,
    MatCardTitle,
    MatCardContent,
    DatePipe,
    AsyncPipe,
    MatToolbar,
    MatIconButton,
    MatTooltip,
    MatFormField,
    MatInput,
    MatFormField,
    MatLabel,
    JsonPipe
  ],
  standalone: true,
  templateUrl: './homeschool.component.html',
  styleUrl: './homeschool.component.css'
})
export class HomeschoolComponent {
  router = inject(Router);
  subjectService = inject(SubjectService);

  goalInput = signal('')

  subjects$ = this.subjectService.getAll()

  async openSubject(id: string) {
    await this.router.navigate(['./homeschool/subject', id])
  }

  updateGoalInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.goalInput.set(inputElement.value);
  }

  async addSubject() {
    await this.subjectService.createSubject({
      title: this.goalInput(),
      grade: "A+",
      lastUpdated: new Date()
    });
    this.goalInput.set('')
  }

  async deleteSubject(id: string) {
    await this.subjectService.deleteSubject(id);
  }

  goBack() {
    this.router.navigate(['..']);
  }
}
