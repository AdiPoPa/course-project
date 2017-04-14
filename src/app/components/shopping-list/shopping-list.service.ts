import { Injectable } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ShoppingListService {

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    const ingredientSearched = this.searchIngredient(ingredient);
    if (ingredientSearched == -1) {
      this.ingredients.push(ingredient);
    } else {
      this.ingredients[ingredientSearched].amount += ingredient.amount;
    }
    this.ingredientChanged.next(this.ingredients.slice());
  }

  extractAmount(ingredient: Ingredient) {
    const ingredientSearched = this.searchIngredient(ingredient);
    if (ingredientSearched != -1) {
      if (this.ingredients[ingredientSearched].amount >= ingredient.amount) {
        this.ingredients[ingredientSearched].amount -= ingredient.amount;
      } else {
        this.ingredients.splice(ingredientSearched, 1);
      }
      this.ingredientChanged.next(this.ingredients.slice());
    }
  }

  searchIngredient(ingredient: Ingredient) {
    for (let i = 0; i < this.ingredients.length; i++) {
      if (this.ingredients[i].name === ingredient.name) {
        return i;
      }
    }
    return -1;
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients); // ... - spread operator (wtf?!)
    this.ingredientChanged.next(this.ingredients.slice());
    /*
     for (let ingredient of ingredients) {
     this.addIngredient(ingredient);
     }
     */
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.ingredients.slice());
  }

}
