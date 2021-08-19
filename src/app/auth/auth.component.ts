import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import * as AuthActions from "../auth/store/auth.actions";
import * as fromApp from "../store/app.reducer";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoading = false;
  error: string = null;
  private storeSub: Subscription;

  constructor(private auth: AuthService, private router: Router, private route: ActivatedRoute, private store: Store<fromApp.AppState>) { }

  ngOnDestroy(): void {
        this.storeSub.unsubscribe();
    }

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.error;
    });
  }

  onSubmit(form: NgForm) {
    if(!form.valid)
      return;

    let email = form.value['email'];
    let password = form.value['password'];
    this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));
    form.reset();
  }

  onSignup(form: NgForm) {
    if(!form.valid)
      return;

    let email = form.value['email'];
    let password = form.value['password'];
    this.store.dispatch(new AuthActions.SignUpStart({email: email, password: password}));
    form.reset();
  }
}
