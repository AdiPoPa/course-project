import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './components/recipes/recipes.component';
import { ShoppingListComponent } from './components/shopping-list/shopping-list.component';
import { RecipeStartComponent } from './components/recipes/recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './components/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from "app/components/recipes/recipe-edit/recipe-edit.component";
import { SignupComponent } from './components/auth/signup/signup.component';
import { SigninComponent } from './components/auth/signin/signin.component';
import { AuthGuard } from './components/auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes/.', pathMatch: 'full' },
  { path: 'recipes/.', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent },
    { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard] },
    { path: ':id', component: RecipeDetailComponent },
    { path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard] }
  ] },
  { path: 'shopping-list/.', component: ShoppingListComponent },
  { path: 'signup/.', component: SignupComponent },
  { path: 'signin/.', component: SigninComponent },

  { path: 'recipes', redirectTo: 'recipes/.' },
  { path: 'shopping-list', redirectTo: 'shopping-list/.' },
  { path: 'signup', redirectTo: 'signup/.' },
  { path: 'signin', redirectTo: 'signin/.' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
