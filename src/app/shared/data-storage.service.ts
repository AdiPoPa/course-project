import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../components/recipes/recipe.service';
import { ShoppingListService } from '../components/shopping-list/shopping-list.service';
import 'rxjs/Rx';
import { Recipe } from '../components/recipes/recipe.model';
import { AuthService } from '../components/auth/auth.service';

@Injectable()
export class DataStorageService {

  private recipesUrl = 'https://ng-course-project.firebaseio.com/recipes.json';
  private shoppingListUrl = 'https://ng-course-project.firebaseio.com/shopping-list.json';

  constructor(private http: Http, private recipeService: RecipeService, private shoppingListService: ShoppingListService,
    private authService: AuthService) {}

  storeRecipes() {
    const token = this.authService.getToken();

    return this.http.put(this.recipesUrl + '?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();

    this.http.get(this.recipesUrl + '?auth=' + token).map(
      (response: Response) => {
        const recipes: Recipe[] = response.json();
        for (let recipe of recipes) {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }
        }
        return recipes;
      }
    ).subscribe(
      (recipes: Recipe[]) => {
        this.recipeService.setRescipes(recipes);
      }
    );
  }

  storeShoppingList() {

  }

  getShoppingList() {

  }

}
