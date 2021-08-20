import {Ingredient} from "../shared/ingredient.model";
import * as ShoppingListActions from "./shopping-list.actions";

export interface State {
  ingredients: Ingredient[];
}

const initState: State = {
  ingredients: []
}

export function shoppingListReducer(state = initState, action: ShoppingListActions.ShoppingListActions) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      let st: Ingredient[] = [...state.ingredients];
      let done = false;
      for (let index = 0; index < st.length; index++) {
        if(st[index].name === action.payload.name) {
          st[index] = new Ingredient(st[index].name, st[index].amount + +action.payload.amount)
          done = true;
          break;
        }
      }
      if(!done) {
        return {...state, ingredients: [...state.ingredients, action.payload]}
      }
      return {...state, ingredients: st};

    case ShoppingListActions.ADD_INGREDIENTS:
      let ingr = state.ingredients;
      let temp = [...action.payload];
      ingr.forEach(i => {
        let done = false;
        action.payload.forEach( (y, index) => {
          if(i.name === y.name && done === false) {
            temp[index] = new Ingredient(i.name, action.payload[index].amount + i.amount);
            done=true;
            return;
          }
        })
        if(!done) {
          temp.push(i);
        }
      });
      return {...state, ingredients: temp};

    case ShoppingListActions.DELETE_INGREDIENT:
      return {...state, ingredients: state.ingredients.filter(i => {
          return i.name != action.payload.name;
        })};

    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[action.payload.index];
      const updatedIngredient = {...ingredient, ...action.payload.ingredient};
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[action.payload.index] = updatedIngredient;
      return {...state, ingredients: updatedIngredients};

    default: return state;
  }

}
