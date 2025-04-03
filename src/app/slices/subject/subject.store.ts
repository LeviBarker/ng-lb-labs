import {Subject} from '../../models/subject';
import {signalStore, withState} from '@ngrx/signals';

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
  withState(initialState)
)
