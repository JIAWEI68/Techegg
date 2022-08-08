import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { items } from './items';
import { itemsList } from './mock-items';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  constructor(private http: HttpClient) {}
  url: string = "http://localhost:3000/api/items";

  getItems(): items[] {
    return itemsList;
  }
  getItemId(id: number) {
    return itemsList.find((items) => items.id == id);
  }
  category: string = '';
  getItemsFiltered(category: any) {
    return itemsList.find((items) => items.category == category);
  }
  getItemsDB() {
    return this.http.get(this.url, {responseType: 'text'});
  }
  addItem(item: items) {
    return this.http.post<items>(this.url, item);
  }
  getAllItems() {
    return this.http.get<items[]>(this.url, {responseType: 'json'});
   }
}
