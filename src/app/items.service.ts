import { Injectable } from '@angular/core';
import { items } from './items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private listOfItems : items[] = [
    {
      name : 'Acer Monitor KA2 Series',
      description : 'This monitor is clean, cheap and is able to have a very good HD screen as it has 165Hz of refresh rates.',
      startingPicture: './assests/Acer_Monitors_KA2-Series.png',
      descriptionPicture: './assests/Acer_Monitors_KA2-Series_Side-View.png',
      priceRating : 3,
      sustainabilityRating : 4,
      cost : "$168",
      category : "Monitor"
    }

  ]
  constructor() { }

  getItems() : items[] {
    return this.listOfItems;
  }
}
