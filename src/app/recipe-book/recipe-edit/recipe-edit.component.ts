import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Recipe} from "../recipe.model";
import {Store} from "@ngrx/store";
import * as RecipeActions from '../store/recipe.actions';
import * as fromApp from "../../store/app.reducer";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;
  // @ts-ignore
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.editMode = p['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let name = '';
    let path = '';
    let desc = '';
    let recipeIngredients = new FormArray([]);
    if(this.editMode) {
      this.store.select('recipe').pipe(
        map(recipeState => {
          return recipeState.recipes.find((r, index) => +r.id === +this.id);
        })
      ).subscribe((recipe: Recipe) => {
        name = recipe.name;
        desc = recipe.description;
        path = recipe.imagePath;
        if (recipe != null && recipe['ingredients']) {
          for (let ingr of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingr.name, Validators.required),
                'amount': new FormControl(ingr.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
              })
            );
          }
        }
      });
    }
    else {
      recipeIngredients.push(
        new FormGroup({
          'name': new FormControl("", Validators.required),
          'amount': new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }));
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'imagePath': new FormControl(path, Validators.required),
      'description': new FormControl( desc, Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    let newRecipe = new Recipe(+this.id, this.recipeForm.value['name'], this.recipeForm.value['description'], this.recipeForm.value['imagePath'], this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe({id: this.id, recipe: newRecipe}));
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe({name: this.recipeForm.value['name'], description: this.recipeForm.value['description'],
        url: this.recipeForm.value['imagePath'], ingredients: this.recipeForm.value['ingredients']}));
    }
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addNewIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      'name' : new FormControl("", Validators.required),
      'amount' : new FormControl("", [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onCancel() {
    this.recipeForm.reset();
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  removeIngredientEntry(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
