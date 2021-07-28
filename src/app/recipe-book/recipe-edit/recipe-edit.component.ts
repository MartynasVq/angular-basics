import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../recipe.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {Recipe} from "../recipe.model";

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

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(p => {
      this.id = p['id'];
      this.editMode = p['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let recipe;
    let recipeIngredients = new FormArray([]);
    if(this.editMode) {
      recipe = this.recipeService.getRecipes().filter(r => r.id == this.id)[0];
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
    } else {
      recipeIngredients.push(
        new FormGroup({
          'name': new FormControl("", Validators.required),
          'amount': new FormControl(0, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        }));
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(this.editMode ? recipe?.name : '', Validators.required),
      'imagePath': new FormControl(this.editMode ? recipe?.imagePath : '', Validators.required),
      'description': new FormControl( this.editMode ? recipe?.description : '', Validators.required),
      'ingredients': recipeIngredients
    });
  }

  onSubmit() {
    if(this.id == null) {
      this.id = +this.recipeService.getNextId();
      console.log(this.recipeService.getNextId());
    }
    let newRecipe = new Recipe(+this.id, this.recipeForm.value['name'], this.recipeForm.value['description'], this.recipeForm.value['imagePath'], this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, newRecipe);
    } else {
      this.recipeService.addRecipe(newRecipe);
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
