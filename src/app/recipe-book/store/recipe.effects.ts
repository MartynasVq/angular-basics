import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../auth/auth.service";

@Injectable()
export class RecipeEffects {


  constructor(private actions$: Actions, private http: HttpClient) {
  }
}
