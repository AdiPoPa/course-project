import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';

const recipesRoutes: Routes = [
  { path: 'signup/.', component: SignupComponent },
  { path: 'signin/.', component: SigninComponent },

  { path: 'signup', redirectTo: 'signup/.' },
  { path: 'signin', redirectTo: 'signin/.' }
];

@NgModule({
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
