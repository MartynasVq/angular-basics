import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
import {exhaustMap, map, take} from "rxjs/operators";
import * as fromApp from "../store/app.reducer";
import {Store} from "@ngrx/store";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  constructor(private auth: AuthService, private store: Store<fromApp.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => {return authState.user}),
      exhaustMap(u => {
        if(u == null) {
          return next.handle(req);
        }
        const clone = req.clone({params: new HttpParams().set("auth", u.token)});
        return next.handle(clone);
      })
    );

  }
}
