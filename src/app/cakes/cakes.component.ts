import { Component, OnDestroy, OnInit } from '@angular/core';
import { CakeService } from '../service/cake.service';
import { Cake } from '../model/cake.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cakes',
  templateUrl: './cakes.component.html',
  styleUrls: ['./cakes.component.css']
})
export class CakesComponent implements OnInit, OnDestroy {

  cakes: Cake[] = [];
  cakesSubscription: Subscription = new Subscription();

  ingredients: string[] = [];
  ingredientsSubscription: Subscription = new Subscription();


  queryParams = {
    sort: 'name',
    sortDirection: 'asc',
    filter: {
      ingredients: ''
    }
  }

  constructor(private cakeService: CakeService) { }

  ngOnInit(): void {
    this.getAllCakes();
    this.getAllIngredients();
  }

  getAllCakes() {
    this.cakesSubscription = this.cakeService.getAllCakes(this.queryParams).subscribe({
      next: (cakes: Cake[]) => {
        console.log(cakes);
        this.cakes = cakes;
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }

  getAllIngredients() {
    this.ingredientsSubscription = this.cakeService.getIngredientsList().subscribe({
      next: (ingredients: string[]) => {
        this.ingredients = ingredients;
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }

  filterCakes(ingredient: any) {
    this.queryParams.filter.ingredients = ingredient.target.value;
    console.log(this.queryParams.filter.ingredients);

    this.getAllCakes();
  }

  ngOnDestroy(): void {
    this.cakesSubscription.unsubscribe();
    this.ingredientsSubscription.unsubscribe();
  }
}
