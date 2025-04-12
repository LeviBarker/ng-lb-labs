import {Component, computed, inject, Signal} from '@angular/core';
import {SubjectStore} from '../../slices/subject/subject.store';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {Subject} from '../../models/subject';
import {SubjectService} from '../../slices/subject/subject.service';

const HOME_ROUTE = './homeschool';

@Component({
  selector: 'app-subject-detail',
  imports: [AsyncPipe, JsonPipe, MatButton, MatIcon, MatToolbar, MatInput, MatFormField, MatLabel],
  standalone: true,
  templateUrl: './subject-detail.component.html',
  styleUrl: './subject-detail.component.css',
})
export class SubjectDetailComponent {
  private readonly subjectStore = inject(SubjectStore);
  private readonly subjectService = inject(SubjectService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  currentSubjectId = toSignal(
    this.route.paramMap.pipe(map((paramMap) => paramMap.get('id')))
  );

  subject: Signal<Subject | null> = computed(() => this.getSubjectById(this.currentSubjectId()));

  private getSubjectById(id?: string | null) {
    return id ? this.subjectStore.subjects()[id] : null;
  }

  async goBack() {
    await this.router.navigate([HOME_ROUTE]);
  }

  async updateTitle(event: FocusEvent) {
    await this.subjectService.update({...this.subject(), title: (event.target as HTMLInputElement).value});
  }

  async updateGrade(event: FocusEvent) {
    await this.subjectService.update({...this.subject(), grade: (event.target as HTMLInputElement).value});
  }

  async deleteSubject(id: string) {
    await this.subjectService.delete(id);
    await this.goBack();
  }
}
