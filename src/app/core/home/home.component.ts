import { Component } from '@angular/core';
import { Slide } from 'src/app/model/slide.model';
import { CakeService } from 'src/app/service/cake.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  slides: Slide[] = [];

  constructor(private service: CakeService) { }

  ngOnInit() {
    this.getSlides();
  }

  getSlides(): void {
    this.service.getSlides().subscribe({
      next: (slides: Slide[]) => {
        this.slides = slides;
      },
      error: (response: any) => {
        console.log('error: ', response);
      }
    })
  }


}
