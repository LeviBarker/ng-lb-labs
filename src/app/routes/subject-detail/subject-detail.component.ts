import {Component, inject} from '@angular/core';
import {SubjectStore} from '../../slices/subject/subject.store';
import {ActivatedRoute} from '@angular/router';
import {map} from 'rxjs';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-subject-detail',
  imports: [
    AsyncPipe
  ],
  standalone: true,
  templateUrl: './subject-detail.component.html',
  styleUrl: './subject-detail.component.css'
})
export class SubjectDetailComponent {
  subjectStore = inject(SubjectStore);
  route = inject(ActivatedRoute);

  id$ = this.route.paramMap.pipe(
    map((paramMap) => paramMap.get("id"))
  )


}
