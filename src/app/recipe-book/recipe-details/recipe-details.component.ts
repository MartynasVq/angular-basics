import {Component, OnInit} from '@angular/core';
import {Recipe} from "../recipe.model";
import {ShoppingService} from "../../shopping-list/shopping.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {Store} from "@ngrx/store";
import * as RecipeActions from '../store/recipe.actions';
import * as fromApp from "../../store/app.reducer";
import {Subscription} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipeToDisplay?: Recipe;
  id?: number;
  sub: Subscription;

  constructor(private shoppingService: ShoppingService, private route: ActivatedRoute,
              private recipeService: RecipeService, private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      this.id = +param['id'];
      this.store.select('recipe').
      pipe(map(recipeState => {
        return recipeState.recipes.find(r => r.id === this.id);
      })).subscribe(rec => {
        this.recipeToDisplay = rec;
    })});
  }

  addToCart() {
    this.shoppingService.addIngredients(this.recipeToDisplay!);
  }

  deleteRecipe(id: number) {
    this.store.dispatch(new RecipeActions.DeleteRecipe({id: id}));
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
