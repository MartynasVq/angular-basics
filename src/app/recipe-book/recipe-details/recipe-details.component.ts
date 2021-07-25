import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {Ingredient} from "../../shared/ingredient.model";
import {ShoppingService} from "../../shopping-list/shopping.service";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  @Input() recipeToDisplay?: Recipe;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.shoppingService.addIngredients(this.recipeToDisplay!);
  }
}
