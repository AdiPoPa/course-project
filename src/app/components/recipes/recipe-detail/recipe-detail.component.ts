import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  recipe: Recipe;
  id: number;
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    // const id = this.route.snapshot.params['id'];
    this.recipeSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.recipeService.getRecipe(this.id);
      }
    );
    if (!this.recipe) {
      this.recipeSubscription.unsubscribe();
      this.router.navigate(['/recipes']);
    }
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    // this.router.navigate(['edit'], {relativeTo: this.route});
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    if (this.authService.isAuthenticated()) {
      this.recipeService.deleteRecipe(this.id);
      this.router.navigate(['/recipes']);
    } else {
      this.router.navigate(['/signin']);
    }
  }

  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }
}
