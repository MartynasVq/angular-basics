import {EventEmitter, Injectable} from '@angular/core';
import {Recipe} from "./recipe.model";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [];
  recipeUpdate = new Subject<Recipe[]>();
  maxId: number;

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeUpdate.next(this.recipes);
  }

}
