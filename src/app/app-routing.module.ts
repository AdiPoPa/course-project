import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/core/home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes/.', loadChildren: './components/recipes/recipes.module#RecipesModule' },
  { path: 'shopping-list/.', loadChildren: './components/shopping-list/shopping-list.module#ShoppingListModule'},

  { path: 'recipes', redirectTo: 'recipes/.' },
  { path: 'shopping-list', redirectTo: 'shopping-list/.' },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
