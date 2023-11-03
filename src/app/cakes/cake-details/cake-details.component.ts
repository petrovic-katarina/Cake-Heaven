import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cake } from 'src/app/model/cake.model';
import { CakeService } from 'src/app/service/cake.service';

@Component({
  selector: 'app-cake-details',
  templateUrl: './cake-details.component.html',
  styleUrls: ['./cake-details.component.css']
})
export class CakeDetailsComponent {

  cakeId!: number;
  cake: Cake = new Cake();

  cakesSubscription: Subscription = new Subscription();

  constructor(private cakeService: CakeService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.cakeId = params['id'];
      this.showOneCake();
    })
  }

  showOneCake() {
    this.cakesSubscription = this.cakeService.getOneCake(this.cakeId).subscribe({
      next: (cake: Cake) => {
        console.log(cake);
        this.cake = cake;
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }


  ngOnDestroy(): void {
    this.cakesSubscription.unsubscribe();
  }

}
