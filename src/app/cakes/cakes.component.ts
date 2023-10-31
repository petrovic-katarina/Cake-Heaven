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

  constructor(private cakeService: CakeService) { }

  ngOnInit(): void {
    this.getAllCakes();
  }

  getAllCakes() {
    this.cakesSubscription = this.cakeService.getAllCakes().subscribe({
      next: (cakes: Cake[]) => {
        console.log(cakes);
        this.cakes = cakes;
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }

  ngOnDestroy(): void {

  }
}
