import { Injectable } from '@angular/core';
import { items } from './items';
import { itemsList } from './mock-items';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor() {}

  getItems(): items[] {
    return itemsList;
  }
  getItemId(id: number) {
    return itemsList.find((items) => items.id == id);
  }
  category: string = "";
  getItemsFiltered(category : any){
    return itemsList.find((items)=> items.category == category);
  }
}
