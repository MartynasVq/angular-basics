import {Injectable, OnDestroy} from '@angular/core';
import {Store} from "@ngrx/store";
import * as AuthActions from "../auth/store/auth.actions";
import * as fromApp from "../store/app.reducer";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenExpTimer: any;

  constructor(private store: Store<fromApp.AppState>) {
  }

  setAutoLogout(exp: number) {
    this.tokenExpTimer = setTimeout(() => {this.store.dispatch(new AuthActions.Logout())}, exp);
  }

  clearTimeout() {
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
  }
}
