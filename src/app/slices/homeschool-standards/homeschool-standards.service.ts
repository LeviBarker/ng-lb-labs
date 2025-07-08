import { inject, Injectable } from "@angular/core";
import { collection, collectionData, DocumentData, Firestore, QueryDocumentSnapshot, SnapshotOptions } from "@angular/fire/firestore";
import { STANDARD_DROPDOWN_ADJACENT_POSITIONS } from "@angular/cdk/overlay";import { HomeschoolStandard } from "./homeschool-standard";

const converter = {
    toFirestore(standard: HomeschoolStandard): DocumentData {
      return standard
    },
  
    fromFirestore(
      snapshot: QueryDocumentSnapshot,
      options: SnapshotOptions
    ): HomeschoolStandard {
      const data = snapshot.data(options)!;
      const id = snapshot.id!;
      return {
        id,
        ...data
      } as HomeschoolStandard
    }
  };

@Injectable({
    providedIn: 'root'
})
export class HomeschoolStandardsService {
    firestore = inject(Firestore)
    collection = collection(this.firestore, 'homeschool_standards').withConverter(converter)

    getAll() {
        return collectionData(this.collection)
    }
}