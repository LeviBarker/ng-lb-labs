import {Component, computed, inject} from '@angular/core';
import { HomeschoolRecordsService } from '../../slices/homeschool-records/homeschool-records.service';
import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { MatCard, MatCardHeader, MatCardModule } from '@angular/material/card';
import { FirebaseImageComponent } from '../../ui/firebase-image/firebase-image.component';
import { collection, collectionData, Firestore, query, where } from '@angular/fire/firestore';
import { HomeschoolRecord } from '../../models/homeschool-record';
import { map, Observable, startWith, switchMap } from 'rxjs';
import {Auth, user} from '@angular/fire/auth';
import {toSignal} from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';

interface Item {
  name: string;
}

@Component({
  selector: 'app-homeschool-list',
  imports: [
    AsyncPipe,
    JsonPipe,
    MatCard,
    MatCardHeader,
    MatCardModule,
    DatePipe,
    FirebaseImageComponent,
    MatButton
  ],
  templateUrl: './homeschool-list.component.html',
  standalone: true,
  styleUrl: './homeschool-list.component.css'
})
export class HomeschoolListComponent {
  firestore = inject(Firestore);
  auth = inject(Auth);
  router = inject(Router);

  homeschoolRecordsCollection = collection(this.firestore, 'homeschool_records');

  user$ = user(this.auth);
  records$ = this.user$.pipe(switchMap(user => {
    return collectionData(query(this.homeschoolRecordsCollection, where('uid', '==', user?.uid)))  as Observable<HomeschoolRecord[]>
  }));

  goToAdd() {
    this.router.navigate(['homeschool/add'])
  }

}
