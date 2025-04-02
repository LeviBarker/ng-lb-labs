import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatCard, MatCardContent, MatCardTitle} from '@angular/material/card';
import {Subject} from '../../models/subject';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-homeschool',
  imports: [
    MatButton,
    MatIcon,
    MatCard,
    MatCardTitle,
    MatCardContent,
    DatePipe
  ],
  standalone: true,
  templateUrl: './homeschool.component.html',
  styleUrl: './homeschool.component.css'
})
export class HomeschoolComponent {
  router = inject(Router);

  subjects: Subject[] = [
    {
      id: "1234",
      title: "Science",
      grade: "A+",
      lastUpdated: new Date()
    }
  ]

  goBack() {
    this.router.navigate(['..']);
  }
}
