import {Recipe} from "../recipe.model";
import * as RecipeActions from './recipe.actions';


export interface State {
  recipes: Recipe[],
  selectedRecipe: Recipe
}

const initialState: State = {
  recipes: [],
  selectedRecipe: null
}

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case RecipeActions.ADD_RECIPE:
      let temp: Recipe[] = [...state.recipes];
      temp.push(action.payload.recipe);
      return {...state, recipes: temp, selectedRecipe: {...action.payload.recipe}};

    case RecipeActions.DELETE_RECIPE:
      return {...state, recipes: state.recipes.filter(r => {
        return r.id != +action.payload.id;
        }), selectedRecipe: null};

    case RecipeActions.SET_RECIPES:
      return {...state, recipes: [...action.payload.recipes]};

    case RecipeActions.FETCH_RECIPES:
      return {...state};

    case RecipeActions.SELECT_RECIPE:
      return {...state, selectedRecipe: {...action.payload.recipe}};

    case RecipeActions.UPDATE_RECIPE:
      let rec = {...action.payload.recipe};
      let ind;
      const updatedRecipes = [...state.recipes];
      updatedRecipes.forEach((r, index) => {
        if (r.id == +action.payload.recipe.id) {
          ind = index;
        }
      });
      updatedRecipes[ind] = rec;
      return {...state, recipes: updatedRecipes};

    case RecipeActions.SAVE_RECIPES:
      return {...state};

    default:
      return state;
  }
}