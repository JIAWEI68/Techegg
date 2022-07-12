import { Pipe, PipeTransform } from '@angular/core';
import { items } from '../items';

@Pipe({
  name: 'nameChecker'
})
export class NameCheckerPipe implements PipeTransform {
  items !: items

  transform(reviews: any[], itemId : number): any[] {
    return reviews.filter((reviews) => {
      return reviews.itemId = itemId
    })
    
  }

}
