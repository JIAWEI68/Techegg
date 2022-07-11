import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nameChecker'
})
export class NameCheckerPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
