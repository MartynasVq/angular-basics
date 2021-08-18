import { Injectable, EventEmitter } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Recipe} from "../recipe-book/recipe.model";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "./shopping-list.actions";
import * as fromApp from "../store/app.reducer";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {

  constructor(private store: Store<fromApp.AppState>) { }

  removeIngredient(ingr: Ingredient) {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(ingr));

  }

  addIngredients(ingr: Recipe) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingr.ingredients));
  }
}
