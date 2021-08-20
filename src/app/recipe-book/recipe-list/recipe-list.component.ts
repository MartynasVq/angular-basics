import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";
import {RecipeService} from "../recipe.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as RecipeActions from '../store/recipe.actions';
import * as fromApp from "../../store/app.reducer";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  subscription: Subscription;

  constructor(private recipeService: RecipeService, private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.subscription = this.store.select('recipe').pipe(
      map(recipeState => recipeState.recipes)).subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
    });
  }

  onRecipeSelect(recipe: Recipe) {
    this.store.dispatch(new RecipeActions.SelectRecipe({recipe: recipe}));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
