import { Component, OnInit } from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingService} from "./shopping.service";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  animations: [
    trigger('in', [
      transition('void => *', [
        animate(1000, keyframes([
          style({
            offset: 0,
            opacity: 0,
            transform: 'translateX(-100px)'
          }),
          style({
            offset: 0.5,
            opacity: 0.5,
            transform: 'translateX(-50px)'
          }),
          style({
            offset: 1,
            opacity: 1,
            transform: 'translateX(0)'
          }),
        ]))
      ]),
      transition('* => void', [
        animate(1000, keyframes([
          style({
            offset: 0,
            opacity: 1,
            transform: 'translateX(0)'
          }),
          style({
            offset: 0.5,
            opacity: 0.5,
            transform: 'translateX(50px)'
          }),
          style({
            offset: 1,
            opacity: 0,
            transform: 'translateX(100px)'
          }),
        ]))
      ])
    ]),
  ]
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingService.recipeToCart.subscribe(i => this.ingredients = i);
  }

  addToCart(ingr: Ingredient) {
    this.shoppingService.addIngredient(ingr);
  }

  removeFromCart(ingr: Ingredient) {
    this.shoppingService.removeIngredient(ingr);
  }

  finished() {
    console.log("animation done");
  }

}
