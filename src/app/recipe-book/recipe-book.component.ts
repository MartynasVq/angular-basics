import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipeService} from "./recipe.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit, OnDestroy {
  selectedRecipe?: Recipe;
  private sub?: Subscription;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.sub = this.recipeService.recipeSelected.subscribe(recipe => this.selectedRecipe = recipe);
  }

  ngOnDestroy(): void {
    this.sub!.unsubscribe();
  }

}
