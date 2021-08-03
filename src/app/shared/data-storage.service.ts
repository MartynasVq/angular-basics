import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../recipe-book/recipe.model";
import {RecipeService} from "../recipe-book/recipe.service";
import {exhaustMap, map, take, tap} from "rxjs/operators";
import {AuthService} from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class DataStorageService {

  url = "https://angular-basics-9aa3f-default-rtdb.europe-west1.firebasedatabase.app/recipes.json";

  constructor(private http: HttpClient, private recipeService: RecipeService, private auth: AuthService) {
  }

  storeRecipes() {
    let recipes = this.recipeService.getRecipes();
      return this.http.put(this.url, recipes).subscribe(res => console.log(res));
  }

  fetchRecipes() {
    return this.auth.user.pipe(take(1), exhaustMap(u => {
        return this.http.get<Recipe[]>(this.url + '?auth=' + u.token);
      }), map(r => {
        return r.map(r => {
          return {...r, ingredients: r.ingredients ? r.ingredients : []}
        });
      }),
      tap(r => {
        this.recipeService.setRecipes(r);
      }));
  }
}
