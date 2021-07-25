import { Injectable, EventEmitter } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {Recipe} from "../recipe-book/recipe.model";

@Injectable({
  providedIn: 'root'
})
export class ShoppingService {
  ingredients: Ingredient[] = [];
  recipeToCart = new EventEmitter<Ingredient[]>();

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(ingr: Ingredient) {
    var done = false;
    this.ingredients.forEach((i, index) => {
      if(i.name === ingr.name) {
        this.ingredients[index].amount = +this.ingredients[index].amount + +ingr.amount;
        done = true;
        return;
      }
    });
    if(!done) {
      this.ingredients.push(ingr);
    }
    this.recipeToCart.emit(this.ingredients.slice());
  }

  removeIngredient(ingr: Ingredient) {
    this.ingredients.splice(this.ingredients.indexOf(ingr), 1);
    this.recipeToCart.emit(this.ingredients.slice());
  }

  addIngredients(ingr: Recipe) {
    ingr.ingredients.forEach(i => {
      let done = false;
      this.ingredients.forEach( (y, index) => {
        if(i.name === y.name && done === false) {
          this.ingredients[index] = new Ingredient(i.name, this.ingredients[index].amount + i.amount);
          done=true;
          return;
        }
      })
      if(!done) {
        this.ingredients.push({...i});
      }
    });
    this.recipeToCart.emit(this.ingredients.slice());
  }
}
