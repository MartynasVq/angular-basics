import {Component, OnDestroy, OnInit} from '@angular/core';
import {Recipe} from "./recipe.model";
import {RecipeService} from "./recipe.service";
import {Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import * as RecipeActions from './store/recipe.actions';
import * as fromApp from "../store/app.reducer";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit, OnDestroy {
  selectedRecipe?: Recipe;
  private sub?: Subscription;

  constructor(private recipeService: RecipeService, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.sub = this.store.select('recipe').pipe(map(recipeState => {
      return recipeState.selectedRecipe;
    })).subscribe((rec: Recipe) => {
      this.selectedRecipe = rec;
    });
  }

  ngOnDestroy(): void {
    this.sub!.unsubscribe();
  }

}
