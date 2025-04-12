import {inject, Injectable} from '@angular/core';
import {Firestore, collection, collectionData, addDoc, deleteDoc, doc, updateDoc} from '@angular/fire/firestore';
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

  create(subject: Partial<Subject>) {
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

  update(subject: Partial<{id: string} & Subject>) {
    return updateDoc(doc(this.collection, subject.id), subject)
  }

  delete(id: string) {
    return deleteDoc(doc(this.collection, id))
  }
}
