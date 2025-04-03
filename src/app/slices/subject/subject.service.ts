import {inject, Injectable} from '@angular/core';
import {Firestore, collection, collectionData, addDoc, deleteDoc, doc} from '@angular/fire/firestore';
import {Subject} from '../../models/subject';
import {tap} from 'rxjs';
import {SubjectStore} from './subject.store';
import {patchState} from '@ngrx/signals';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  firestore = inject(Firestore)
  collection = collection(this.firestore, 'subjects')

  subjectStore = inject(SubjectStore)

  createSubject(subject: Partial<Subject>) {
    return addDoc(this.collection, subject)
  }


  getAll() {
    return collectionData(this.collection, {idField: 'id'})
      .pipe(
        tap(subjectArray => patchState(this.subjectStore, () => {
          return {
            subjects: subjectArray.reduce((map, currentValue) => {
              map[currentValue['id']] = currentValue;
              return map;
            }, {})
          }
        }))
      )
  }

  deleteSubject(id: string) {
    const documentRef = doc(this.collection, id)
    return deleteDoc(documentRef)
  }
}
