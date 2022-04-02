import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(value?: number, ...args: unknown[]): unknown {
    if (value || value === 0) {
      const firstValue = Math.floor(value);
      const secondValue = `${(Math.round((value - firstValue) * 100) / 100)}`;
      if (secondValue.length === 1) {
        return `€${firstValue}.${secondValue} EUR`;
      } else {
        return `€${firstValue}.${secondValue.slice(2, secondValue.length)} EUR`;
      }
    }
    return '';
  }
}
