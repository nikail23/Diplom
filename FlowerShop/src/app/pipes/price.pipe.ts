import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price'
})
export class PricePipe implements PipeTransform {

  transform(value?: number, ...args: unknown[]): unknown {
    if (value) {
      const firstValue = Math.floor(value);
      const secondValue = (Math.round((value - firstValue) * 100) / 100).toString();
      return `${firstValue} r. ${secondValue.slice(2, secondValue.length)} c.`;
    }
    return '';
  }

}
