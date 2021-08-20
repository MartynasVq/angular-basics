import {Actions, Effect, ofType} from "@ngrx/effects";
import * as AuthActions from "./auth.actions";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {UserModel} from "../user.model";
import {AuthService} from "../auth.service";

interface AuthResponse {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string
}

@Injectable()
export class AuthEffects {
  signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDxGATeyi_hZLPmTkCVuuwKWv0x3B5BNps';
  signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDxGATeyi_hZLPmTkCVuuwKWv0x3B5BNps';
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponse>(this.signInUrl, {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      }).pipe(map((res) => {
        return new AuthActions.Login({
          email: res.email,
          id: res.localId,
          token: res.idToken,
          expiration: new Date(new Date().getTime() + +res.expiresIn*1000),
          redirect: true
        });
      }), catchError(error => {
        return of(new AuthActions.LoginFail({error: "Error ocurred"}));
      }));
    })
  );
  @Effect({ dispatch: false })
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap((action: AuthActions.Login) => {
      let user = new UserModel(action.payload.email, action.payload.id, action.payload.token, new Date(+action.payload.expiration));
      localStorage.setItem('userData', JSON.stringify(user));
      this.auth.setAutoLogout((+action.payload.expiration - new Date().getTime()));
      if(action.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );
  @Effect({dispatch:false})
  logout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap((action: AuthActions.Logout) => {
      this.router.navigate(['/auth']);
      localStorage.clear();
      this.auth.clearTimeout();
    })
  );
  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      let str: {
        email: string,
        id: string,
        _token: string,
        _tokenExp: string
      } = JSON.parse(localStorage.getItem('userData'));
      if(!str)
        return {type: 'DUMMY'};
      let user = new UserModel(str.email, str.id, str._token, new Date(str._tokenExp));
      if(user.token) {
        return new AuthActions.Login({email: str.email, id: str.id, token: str._token, expiration: new Date(str._tokenExp), redirect: false});
      }
      return {type: 'DUMMY'};
    })
  );
  @Effect()
  authSignUp = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((authData: AuthActions.SignUpStart) => {
      return this.http.post<AuthResponse>(this.signUpUrl, {
        email: authData.payload.email,
        password: authData.payload.password,
        returnSecureToken: true
      }).pipe(map((res) => {
        return new AuthActions.Login({
          email: res.email,
          id: res.localId,
          token: res.idToken,
          expiration: new Date(new Date().getTime() + +res.expiresIn),
          redirect: true
        });
      }), catchError(error => {
        return of(new AuthActions.LoginFail({error: "Error ocurred"}));
      }));
    })
  );

  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private auth: AuthService) {
  }
}
