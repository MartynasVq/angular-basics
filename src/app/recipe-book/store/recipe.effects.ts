import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import * as RecipeActions from './recipe.actions';
import {map, switchMap, tap, withLatestFrom} from "rxjs/operators";
import {Recipe} from "../recipe.model";
import * as fromApp from "../../store/app.reducer";
import {Store} from "@ngrx/store";

@Injectable()
export class RecipeEffects {

  url = "https://angular-basics-9aa3f-default-rtdb.europe-west1.firebasedatabase.app/recipes.json";

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipeActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(this.url);
    }),
    map(recipes => {
      return recipes.map(r => {
        return {...r, ingredients: r.ingredients ? r.ingredients : []}
      });
    }),
    map((r: Recipe[]) => {
      return new RecipeActions.SetRecipes({recipes: r});
    })
  );

  @Effect({dispatch:false})
  saveRecipes = this.actions$.pipe(
    ofType(RecipeActions.SAVE_RECIPES),
    withLatestFrom(this.store.select('recipe')),
    switchMap(([actionData, recipeState]) => {
      return this.http.put(this.url, recipeState.recipes);
    })
  );

  constructor(private actions$: Actions, private http: HttpClient, private store: Store<fromApp.AppState>) {
  }
}
