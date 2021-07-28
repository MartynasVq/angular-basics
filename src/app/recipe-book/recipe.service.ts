import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(1, "TestRecipe", "Lorem Ipsumsaddddddddddddddddddddddddddddddddddddd", "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      [new Ingredient("Apple", 5),
                new Ingredient("Banana", 5),
                new Ingredient("Orange", 5)]),
    new Recipe(2, "TestRecipe", "Lorem Ipsumsaddddddddddddddddddddddddddddddddddddd", "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      [new Ingredient("Apple", 5),
                new Ingredient("Pineapple", 5),
                new Ingredient("Lemon", 5)])
  ];
  recipeSelected = new Subject<Recipe>();
  recipeUpdate = new Subject<Recipe[]>();
  maxId: number;

  constructor() {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeUpdate.next(this.recipes);
  }

  updateRecipe(index: number, recipe: Recipe) {
    let i = 0;
    for (i; i < this.recipes.length; i++) {
      if(this.recipes[i].id == index) {
        this.recipes[i] = recipe;
      }
    }
    this.recipeUpdate.next(this.recipes);
  }

  removeRecipe(id: number) {
    this.recipes = this.recipes.filter(r => r.id != id);
    this.recipeUpdate.next(this.recipes);
  }

  getNextId(): number {
    this.recipes.forEach(r => {
      if (this.maxId != null) {
        if (this.maxId < r.id) {
          this.maxId = r.id;
        }
      } else {
        this.maxId = +r.id;
      }
    });
    return this.maxId + 1;
  }
}
