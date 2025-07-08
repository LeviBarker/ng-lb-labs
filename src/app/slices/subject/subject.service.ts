import {inject, Injectable} from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  query,
  where
} from '@angular/fire/firestore';
import {Subject} from '../../models/subject';
import {tap} from 'rxjs';
import {SubjectStore} from './subject.store';
import {patchState} from '@ngrx/signals';
import {LoginStore} from '../login/login.store';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  loginStore = inject(LoginStore)
  firestore = inject(Firestore)
  collection = collection(this.firestore, 'subjects')

  subjectStore = inject(SubjectStore)

  create(subject: Partial<Subject>) {
    return addDoc(this.collection, {
      ...subject,
      uid: this.loginStore.user()?.uid
    })
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

  getAllByField(field: string, value: unknown) {
    return collectionData(query(this.collection, where('field', '==', value)), {idField: 'id'})
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
