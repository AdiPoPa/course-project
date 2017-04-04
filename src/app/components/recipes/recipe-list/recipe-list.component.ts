import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Recipe} from "../recipe.model";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeSelected = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://jamilacuisine.ro/wp-content/uploads/2014/04/Salata-Caesar-cu-pui.jpg'),
    new Recipe('Another Test Recipe', 'This is another test', 'http://www.seriouseats.com/images/2015/09/20150914-pressure-cooker-recipes-roundup-09.jpg')
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onDetailedRecipe(detailedRecipe: Recipe) {
    this.recipeSelected.emit(detailedRecipe);
  }

}
