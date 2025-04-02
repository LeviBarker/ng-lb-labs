import {inject, Injectable} from '@angular/core';
import {Firestore, collection, collectionData, addDoc} from '@angular/fire/firestore';
import {Subject} from '../../models/subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  firestore = inject(Firestore)
  collection = collection(this.firestore, 'subjects')

  createSubject(subject: Subject) {
    return addDoc(this.collection, subject)
  }

  getAll() {
    return collectionData(this.collection, {idField: 'id'})
  }
}
