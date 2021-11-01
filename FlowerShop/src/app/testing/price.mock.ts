import { PriceDto } from 'src/app/classes/flower';
import { of } from 'rxjs';
import { PriceService } from '../services/price.service';

export const testPriceDto: PriceDto = {
  id: 0,
  price: 0,
  date: '',
  itemId: 0
}

export const priceServiceSpy = jasmine.createSpyObj<PriceService>('PriceService', ['get']);
priceServiceSpy.get.and.returnValue(of([]));
