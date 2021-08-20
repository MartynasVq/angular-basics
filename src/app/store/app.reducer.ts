import * as fromShoppingList from '../shopping-list/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipe-book/store/recipe.reducer';
import {ActionReducerMap} from "@ngrx/store";

export interface AppState {
  recipe: fromRecipes.State,
  shoppingList: fromShoppingList.State,
  auth: fromAuth.State
}

export const appReducer: ActionReducerMap<AppState> = {
  recipe: fromRecipes.recipeReducer,
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer
};
