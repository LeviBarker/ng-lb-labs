import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {Subject} from '../../models/subject';
import {AsyncPipe, DatePipe, JsonPipe} from '@angular/common';
import {SubjectService} from '../../slices/subject/subject.service';

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
    JsonPipe
  ],
  standalone: true,
  templateUrl: './homeschool.component.html',
  styleUrl: './homeschool.component.css'
})
export class HomeschoolComponent {
  router = inject(Router);
  subjectService = inject(SubjectService);

  subjects: Subject[] = [
    {
      id: "1234",
      title: "Science",
      grade: "A+",
      lastUpdated: new Date()
    }
  ]

  subjects$ = this.subjectService.getAll()

  async addSubject() {
    await this.subjectService.createSubject({
      id: "1234",
      title: "Test",
      grade: "A+",
      lastUpdated: new Date()
    })
  }

  goBack() {
    this.router.navigate(['..']);
  }
}
