import {Ingredient} from "../shared/ingredient.model";

export class Recipe {
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[] = [];

  constructor(name: string, description: string, url: string, ingredients: Ingredient[]) {
    this.name = name;
    this.description = description;
    this.imagePath = url;
    this.ingredients = ingredients;
  }

}
