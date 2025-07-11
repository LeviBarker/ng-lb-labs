import {inject, Injectable} from '@angular/core';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';
import {LoginStore} from '../login/login.store';
import {HomeschoolRecord} from '../../models/homeschool-record';

@Injectable({
  providedIn: 'root'
})
export class HomeschoolRecordsService {
  loginStore = inject(LoginStore)
  firestore = inject(Firestore)
  collection = collection(this.firestore, 'homeschool_records')

  create(record: Partial<HomeschoolRecord>) {
    console.log(record);
    return addDoc(this.collection, {
      ...record,
      uid: this.loginStore.user()?.uid
    })
  }

  // getAll() {
  //   return collectionData(this.collection, {idField: 'id'})
  //     .pipe(
  //       tap(subjectArray => patchState(this.subjectStore, () => {
  //         return {
  //           subjects: subjectArray.reduce((map, currentValue) => {
  //             map[currentValue['id']] = currentValue;
  //             return map;
  //           }, {})
  //         }
  //       }))
  //     )
  // }

  // getAllByField(field: string, value: unknown) {
  //   return collectionData(query(this.collection, where('field', '==', value)), {idField: 'id'})
  //     .pipe(
  //       tap(subjectArray => patchState(this.subjectStore, () => {
  //         return {
  //           subjects: subjectArray.reduce((map, currentValue) => {
  //             map[currentValue['id']] = currentValue;
  //             return map;
  //           }, {})
  //         }
  //       }))
  //     )
  // }

  // update(subject: Partial<{id: string} & Subject>) {
  //   return updateDoc(doc(this.collection, subject.id), subject)
  // }
  //
  // delete(id: string) {
  //   return deleteDoc(doc(this.collection, id))
  // }
}
