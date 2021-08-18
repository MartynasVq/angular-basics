import { Injectable, EventEmitter } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Recipe} from "../recipe-book/recipe.model";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "./shopping-list.actions";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingredients: Ingredient[] = [];

  constructor(private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

  getIngredients() {
    return this.ingredients.slice();
  }

  removeIngredient(ingr: Ingredient) {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(ingr));

  }

  addIngredients(ingr: Recipe) {
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingr.ingredients));
  }
}
