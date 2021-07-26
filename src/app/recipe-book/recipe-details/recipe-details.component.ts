import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingService} from "../../shopping-list/shopping.service";
import {ActivatedRoute, Params} from "@angular/router";
import {RecipeService} from "../recipe.service";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipeToDisplay?: Recipe;
  id?: number;

  constructor(private shoppingService: ShoppingService, private route: ActivatedRoute,
              private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.recipeToDisplay = this.recipeService.getRecipes().filter(r => r.id == this.id)[0];
    });

  }

  addToCart() {
    this.shoppingService.addIngredients(this.recipeToDisplay!);
  }
}
