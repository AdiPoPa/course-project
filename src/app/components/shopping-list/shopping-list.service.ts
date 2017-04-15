import { Injectable } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShoppingListService {

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  fromRecipe = false;

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    const ingredientSearched = this.searchIngredient(ingredient);
    if (ingredientSearched == null) {
      ingredient.name = ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);
      this.ingredients.push(ingredient);
    } else {
      ingredientSearched.amount += ingredient.amount;
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  extractAmount(ingredient: Ingredient) {
    const ingredientSearched = this.searchIngredient(ingredient);
    if (ingredientSearched != null) {
      if (ingredientSearched.amount > ingredient.amount) {
        ingredientSearched.amount -= ingredient.amount;
      } else {
        const ingredientPos = this.ingredients.indexOf(ingredientSearched);
        this.ingredients.splice(ingredientPos, 1);
      }
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  searchIngredient(ingredient: Ingredient) {
    for (let ingr of this.ingredients) {
      if (ingr.name.toLowerCase() === ingredient.name.toLowerCase()) {
        return ingr;
      }
    }
    return null;
  }

  addIngredients(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      const newIngredient = new Ingredient(ingredient.name, ingredient.amount);
      this.addIngredient(newIngredient);
    }
    // this.ingredients.push(...ingredients); // ... - spread operator (wtf?!)
    // this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
