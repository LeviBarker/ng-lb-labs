import {Subject} from '../../models/subject';
import {signalStore, withComputed, withState} from '@ngrx/signals';
import {computed} from '@angular/core';

export interface SubjectState {
  subjects: Record<string, Subject>,
  isLoading: boolean
}

const initialState: SubjectState = {
  subjects: {},
  isLoading: false
}

export const SubjectStore = signalStore(
  { providedIn: 'root', protectedState: false},
  withState(initialState),
  withComputed(({subjects}) => ({
    list: computed(() => Object.values(subjects()))
  }))
)
