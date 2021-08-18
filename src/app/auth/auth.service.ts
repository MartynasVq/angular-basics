import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Subject} from "rxjs";
import {UserModel} from "./user.model";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";

interface AuthResponse {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenExpTimer: any;

  signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxGATeyi_hZLPmTkCVuuwKWv0x3B5BNps';
  signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxGATeyi_hZLPmTkCVuuwKWv0x3B5BNps';


  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) { }

  autoLogin() {
    let str: {
      email: string,
      id: string,
      _token: string,
      _tokenExp: string
    } = JSON.parse(localStorage.getItem('userData'));
    if(!str)
      return;
    let user = new UserModel(str.email, str.id, str._token, new Date(str._tokenExp));
    if(user.token) {
      this.store.dispatch(new AuthActions.Login({email: str.email, id: str.id, token: str._token, expiration: new Date(str._tokenExp)}));
      this.autoLogout(new Date(str._tokenExp).getTime() - new Date().getTime());
    }
  }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponse>(this.signUpUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(tap(res => {
      let usr = new UserModel(res.email, res.localId, res.idToken, new Date(new Date().getTime() + +res.expiresIn * 1000));
      this.store.dispatch(new AuthActions.Login({email: res.email, id: res.localId, token: res.idToken, expiration: new Date(new Date().getTime() + +res.expiresIn * 1000)}));
      this.autoLogout(+res.expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(usr));
    }));
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponse>(this.signInUrl, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(tap(res => {
      let usr = new UserModel(res.email, res.localId, res.idToken, new Date(new Date().getTime() + +res.expiresIn * 1000));
      this.store.dispatch(new AuthActions.Login({email: res.email, id: res.localId, token: res.idToken, expiration: new Date(new Date().getTime() + +res.expiresIn * 1000)}));
      this.autoLogout(+res.expiresIn * 1000);
      localStorage.setItem('userData', JSON.stringify(usr));
    }));
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
    localStorage.clear();
    this.router.navigate(['/auth']);
    clearTimeout(this.tokenExpTimer);
  }

  autoLogout(exp: number) {
    this.tokenExpTimer = setTimeout(() => {this.logout();}, exp);
  }

}
