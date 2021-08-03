import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RecipeBookComponent} from "./recipe-book/recipe-book.component";
import {ShoppingListComponent} from "./shopping-list/shopping-list.component";
import {RecipeDetailsComponent} from "./recipe-book/recipe-details/recipe-details.component";
import {EditComponent} from "./shopping-list/edit/edit.component";
import {RecipeEditComponent} from "./recipe-book/recipe-edit/recipe-edit.component";
import {RecipeResolverService} from "./shared/recipe-resolver.service";
import {AuthComponent} from "./auth/auth.component";
import {AuthGuard} from "./auth/auth.guard";

const appRouter: Routes = [
  {path: '', pathMatch: "full", redirectTo: "/recipes"},
  {path: 'auth', pathMatch: "full", component: AuthComponent},
  {path: 'recipes', component: RecipeBookComponent, canActivate: [AuthGuard] , children: [
      {path: 'new', component: RecipeEditComponent},
      {path: ':id', component: RecipeDetailsComponent, resolve: [RecipeResolverService]},
      {path: ':id/edit', component: RecipeEditComponent}
    ]},
  {path: "cart", pathMatch: "full", component: ShoppingListComponent},
  { path: '**', redirectTo: '/recipes' }
]

@NgModule({
  imports: [
    RouterModule.forRoot(appRouter)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {

}
