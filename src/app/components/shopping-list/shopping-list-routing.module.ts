import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShoppingListComponent } from './shopping-list.component';

const recipesRoutes: Routes = [
  { path: 'shopping-list/.', component: ShoppingListComponent },

  { path: 'shopping-list', redirectTo: 'shopping-list/.' }
];

@NgModule({
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule]
})
export class ShoppingListRoutingModule { }
