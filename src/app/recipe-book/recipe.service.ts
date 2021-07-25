import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe("TestRecipe", "Lorem Ipsumsaddddddddddddddddddddddddddddddddddddd", "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      [new Ingredient("Apple", 5),
                new Ingredient("Banana", 5),
                new Ingredient("Orange", 5)]),
    new Recipe("TestRecipe", "Lorem Ipsumsaddddddddddddddddddddddddddddddddddddd", "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      [new Ingredient("Apple", 5),
                new Ingredient("Pineapple", 5),
                new Ingredient("Lemon", 5)])
  ];
  recipeSelected = new EventEmitter<Recipe>();

  constructor() {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  removeRecipe(recipe: Recipe) {

  }
}
