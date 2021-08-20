import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import * as fromApp from "../store/app.reducer";
import {Store} from "@ngrx/store";
import {map} from "rxjs/operators";
import * as AuthActions from "../auth/store/auth.actions";
import * as RecipeActions from '../recipe-book/store/recipe.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  sub: Subscription;

  constructor(private data: DataStorageService, private auth: AuthService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.sub = this.store.select('auth').pipe(map(authState => {return authState.user})).subscribe(u => {
      if(u != null) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  storeRecipes() {
    this.store.dispatch(new RecipeActions.SaveRecipes())
  }

  fetchRecipes() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}

