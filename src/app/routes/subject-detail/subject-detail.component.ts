import {Component, computed, inject} from '@angular/core';
import {SubjectStore} from '../../slices/subject/subject.store';
import {ActivatedRoute, Router} from '@angular/router';
import {map} from 'rxjs';
import {AsyncPipe, JsonPipe} from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

const HOME_ROUTE = './homeschool';

@Component({
  selector: 'app-subject-detail',
  imports: [AsyncPipe, JsonPipe, MatButton, MatIcon, MatToolbar],
  standalone: true,
  templateUrl: './subject-detail.component.html',
  styleUrl: './subject-detail.component.css',
})
export class SubjectDetailComponent {
  private readonly subjectStore = inject(SubjectStore);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  currentSubjectId = toSignal(
    this.route.paramMap.pipe(map((paramMap) => paramMap.get('id')))
  );

  subject = computed(() => this.getSubjectById(this.currentSubjectId()));

  private getSubjectById(id?: string | null) {
    return id ? this.subjectStore.subjects()[id] : null;
  }

  async goBack() {
    await this.router.navigate([HOME_ROUTE]);
  }
}
