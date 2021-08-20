import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "../recipe-book/recipe.model";
import {Observable, of} from "rxjs";
import {DataStorageService} from "./data-storage.service";
import {RecipeService} from "../recipe-book/recipe.service";
import {Store} from "@ngrx/store";
import {map, switchMap, take} from "rxjs/operators";
import * as AuthActions from "../auth/store/auth.actions";
import * as RecipeActions from '../recipe-book/store/recipe.actions';
import * as fromApp from "../store/app.reducer";
import {Actions, ofType} from "@ngrx/effects";

@Injectable({
  providedIn: "root"
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor(private store: Store<fromApp.AppState>, private actions$: Actions) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe[]> | Promise<Recipe[]> | Recipe[] {
    return this.store.select('recipe').pipe(take(1), map(recipeState => {
        return recipeState.recipes
      }), switchMap(recipes => {
        if (recipes.length === 0) {
          this.store.dispatch(new RecipeActions.FetchRecipes());
          return this.actions$.pipe(ofType(RecipeActions.SET_RECIPES), take(1));
        } else {
          return of(recipes);
        }
      })
    );
  }

}
