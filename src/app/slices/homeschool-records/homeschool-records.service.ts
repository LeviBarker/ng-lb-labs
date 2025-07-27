import {HomeschoolStandard} from '../homeschool-standards/homeschool-standard';
import {
  collectionData,
  collection,
  DocumentData,
  Firestore,
  QueryDocumentSnapshot,
  SnapshotOptions,
  addDoc
} from '@angular/fire/firestore';
import {inject, Injectable} from '@angular/core';
import {HomeschoolRecord} from '../../models/homeschool-record';
import {LoginStore} from '../login/login.store';
import {getDownloadURL, getStorage, ref} from '@angular/fire/storage';
import {map} from 'rxjs';

const converter = {
  toFirestore(record: HomeschoolRecord): DocumentData {
    return record
  },

  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): HomeschoolRecord {
    const data = snapshot.data(options)!;
    const id = snapshot.id!;
    return {
      id,
      ...data
    } as HomeschoolRecord
  }
};

@Injectable({
  providedIn: 'root'
})
export class HomeschoolRecordsService {
  loginStore = inject(LoginStore)
  firestore = inject(Firestore)
  collection = collection(this.firestore, 'homeschool_records');
  storage = getStorage();

  getAll() {
    return collectionData(this.collection.withConverter(converter));
  }



  create(record: Partial<HomeschoolRecord>) {
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
