import { Component } from '@angular/core';
import { ItemsService } from './items.service';
import { items } from './items';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Techegg';
  items! : items
  constructor(){ItemsService.call}
}
