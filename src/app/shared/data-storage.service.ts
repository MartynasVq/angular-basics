import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipe-book/recipe.model";
import {RecipeService} from "../recipe-book/recipe.service";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {

  url = "https://angular-basics-9aa3f-default-rtdb.europe-west1.firebasedatabase.app/recipes.json";

  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    let recipes = this.recipeService.getRecipes();
    this.http.put(this.url, recipes).subscribe(r => console.log(r));
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.url).pipe(map( r => {
      return r.map(r => {
        return {...r, ingredients: r.ingredients ? r.ingredients : []}
      });
    }),
    tap(r => {
      console.log(r);
      this.recipeService.setRecipes(r);
    })
    );
  }
}
