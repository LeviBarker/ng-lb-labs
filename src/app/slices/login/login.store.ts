import { User } from "@angular/fire/auth"
import {signalStore, withState} from '@ngrx/signals';

type LoginState = {
  user: User | null,
  isLoading: boolean
}

const initialState: LoginState = {
  user: null,
  isLoading: true
}

export const LoginStore = signalStore(
  { providedIn: 'root', protectedState: false},
  withState(initialState)
)
