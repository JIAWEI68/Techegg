import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter',
})
export class CategoryFilterPipe implements PipeTransform {
  transform(array: any[], query: string[]): any[] {
    if (typeof array === 'object') {
      var resultArray = [];
      if (query.length === 0) {
        resultArray = array;
      }
      else {
        resultArray = (array.filter(function (a) {
         return query.indexOf(a);
       }, query));

      }
      return resultArray;
    }
    else {
     return null as any;
     }
    }
}
