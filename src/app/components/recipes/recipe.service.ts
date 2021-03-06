import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Recipe } from './recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Caesar salad', 'Croutons dressed Caesar salad', 'https://jamilacuisine.ro/wp-content/uploads/2014/04/Salata-Caesar-cu-pui.jpg', [
      new Ingredient('Chicken breasts', 2),
      new Ingredient('Bread croutons', 20),
      new Ingredient('Lettuce', 3),
      new Ingredient('Worcester sauce', 1)
    ]),
    new Recipe('Chicken breasts', 'Garlic roasted chicken breasts', 'http://assets.epicurious.com/photos/578d1f9698e0fc875500146e/master/pass/garlic-roasted-chicken-breasts.jpg', [
      new Ingredient('Large garlic cloves', 3),
      new Ingredient('Teaspoon dried oregano', 1),
      new Ingredient('Chicken breast halves', 4)
    ])
  ];
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {
  }

  setRescipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
