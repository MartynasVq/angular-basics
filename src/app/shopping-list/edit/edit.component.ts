import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";
import {Form, NgForm} from "@angular/forms";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "../shopping-list.actions";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  msg: string;

  constructor(private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) { }

  ngOnInit(): void {
  }

  addNewIngredient(form: NgForm) {
    this.msg = 'Success!';
    let formValues = form.value;
    this.store.dispatch(new ShoppingListActions.AddIngredient(new Ingredient(formValues.name.trim(), formValues.amount)));
  }

  onCloseCall() {
    this.msg = undefined;
  }

}
