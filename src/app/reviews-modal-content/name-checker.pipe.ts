import { Pipe, PipeTransform } from '@angular/core';
import { items } from '../items';

@Pipe({
  name: 'nameChecker'
})
export class NameCheckerPipe implements PipeTransform {
  items !: items

  transform(reviews: any[], itemName: string): any[] {
    if (!itemName) return reviews;
    return reviews.filter((reviews) => {
      return reviews.itemName = this.items.name
    })
    
  }

}
