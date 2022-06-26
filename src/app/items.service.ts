import { Injectable } from '@angular/core';
import { items } from './items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  listOfItems : items[] = [
    {
      name : 'Acer Monitor KA2 Series',
      description : 'This monitor is clean, cheap and is able to have a very good HD screen as it has 165Hz of refresh rates.',
      startingPicture: './assets/AcerMonitor.jpg',
      descriptionPicture: './assets/Acer_Monitors_KA2-Series_Side-View.png',
      priceRating : 3,
      sustainabilityRating : 4,
      cost : "$168",
      category : "Monitor"
    },
    {
      name : 'Alienware 25 Gaming Monitor',
      description : 'This monitor is clean, cheap and is able to have a very good HD screen as it has 165Hz of refresh rates.',
      startingPicture: './assets/',
      descriptionPicture: './assets/Acer_Monitors_KA2-Series_Side-View.png',
      priceRating : 3,
      sustainabilityRating : 4,
      cost : "$168",
      category : "Monitor"
    }

  ]
  constructor() { }

  getItems() {
    return this.listOfItems;
  }
}
