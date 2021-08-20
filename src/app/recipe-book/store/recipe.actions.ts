import {Action} from "@ngrx/store";
import {Recipe} from "../recipe.model";

export const ADD_RECIPE = 'ADD_RECIPE';
export const DELETE_RECIPE = 'DELETE_RECIPE';
export const SET_RECIPES = "SET_RECIPES";
export const FETCH_RECIPES = "FETCH_RECIPES";
export const SAVE_RECIPES = "SAVE_RECIPES";
export const UPDATE_RECIPE = "UPDATE_RECIPE";
export const SELECT_RECIPE = "SELECT_RECIPE";

export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;
  constructor(public payload: { recipe: Recipe }) {
  }
}

export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;
  constructor(public payload: { id:number }) {
  }
}

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;
  constructor(public payload: { recipes: Recipe[] }) {
  }
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export class SaveRecipes implements Action {
  readonly type = SAVE_RECIPES;
}

export class SelectRecipe implements Action {
  readonly type = SELECT_RECIPE;
  constructor(public payload: {recipe: Recipe}) {
  }
}

export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;
  constructor(public payload: {recipe: Recipe}) {
  }
}

export type RecipeActions = AddRecipe | DeleteRecipe | SetRecipes | FetchRecipes | SaveRecipes | UpdateRecipe | SelectRecipe;
