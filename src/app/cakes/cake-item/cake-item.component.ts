import { Component, Input } from '@angular/core';
import { Cake } from 'src/app/model/cake.model';

@Component({
  selector: 'app-cake-item',
  templateUrl: './cake-item.component.html',
  styleUrls: ['./cake-item.component.css']
})
export class CakeItemComponent {

  @Input() cake: Cake = new Cake();

}
