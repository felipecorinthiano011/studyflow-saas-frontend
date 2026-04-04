import { signalStore, withState, withMethods, withHooks, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { AuthService, UserProfile } from '../services/auth.service';

interface AuthState {
  token: string | null;
  user: UserProfile | null;
}

const initialState: AuthState = {
  token: null,
  user: null
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, authService = inject(AuthService)) => ({
    loadFromStorage(): void {
      patchState(store, {
        token: authService.getToken(),
        user: authService.getCurrentUser()
      });
    },
    setUser(token: string, user: UserProfile): void {
      patchState(store, { token, user });
    },
    clear(): void {
      patchState(store, { token: null, user: null });
    }
  })),
  withHooks({
    onInit(store) {
      store.loadFromStorage();
    }
  })
);

