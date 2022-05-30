import { ShoppingCartDto } from './../classes/cart';
import { CatalogService } from 'src/app/services/catalog.service';
import { environment } from './../../environments/environment';
/*import { userServiceSpy } from 'src/app/testing/user.mock';*/
import { TestBed } from '@angular/core/testing';
import { CartService } from './cart.service';
import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { getTestShoppingCartDto } from '../testing/cart.mock';
import { catalogServiceSpy, getTestFlowers } from '../testing/catalog.mock';
import { Flower } from '../classes/flower';

describe('CartService', () => {
  let service: CartService;
  let httpControler: HttpTestingController;
  let userService: UserService;
  let catalogService: CatalogService;
  const flowers: Flower[] = getTestFlowers();
  const shoppingCart: ShoppingCartDto = getTestShoppingCartDto();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        /*{ provide: UserService, useValue: userServiceSpy },*/
        { provide: CatalogService, useValue: catalogServiceSpy }
      ],
    });
    service = TestBed.inject(CartService);
    httpControler = TestBed.inject(HttpTestingController);
    userService = TestBed.inject(UserService);
    catalogService = TestBed.inject(CatalogService);

    const getCart = httpControler.expectOne(environment.api.url + 'cart');
    getCart.flush(shoppingCart);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load cart', () => {
    service.loadCart().subscribe((cart) => {
      expect(cart).toEqual(shoppingCart);
      expect(userService.updateLoggedState).toHaveBeenCalled();
    });

    const getCart = httpControler.expectOne(environment.api.url + 'cart');

    expect(getCart.request.method).toEqual('GET');

    getCart.flush(shoppingCart);
  });

  it('should post cart if load throw error', () => {
    service.loadCart().subscribe((cart) => {
      expect(cart).toEqual(shoppingCart);
      expect(userService.updateLoggedState).toHaveBeenCalled();
    });

    const getCart = httpControler.expectOne(environment.api.url + 'cart');

    expect(getCart.request.method).toEqual('GET');

    getCart.flush(null, {status: 404, statusText: 'Not Found'});

    const postCart = httpControler.expectOne(environment.api.url + 'cart');

    expect(postCart.request.method).toEqual('POST');

    postCart.flush(shoppingCart);
  });

  it('should add flower to cart', () => {
    service.add(0).subscribe((cart) => {
      expect(cart).toEqual(shoppingCart);
      expect(catalogService.get).toHaveBeenCalled();
    })

    const addFlower = httpControler.expectOne(environment.api.url + 'cart/item');

    expect(addFlower.request.method).toEqual('POST');

    addFlower.flush(shoppingCart);
  });

  it('should delete flower from cart', () => {
    const id = 0;

    service.delete(id).subscribe((cart) => {
      expect(cart).toEqual(shoppingCart);
    })

    const deleteFlower = httpControler.expectOne(environment.api.url + `cart/item/${id}`);

    expect(deleteFlower.request.method).toEqual('DELETE');

    deleteFlower.flush(shoppingCart);
  });

  it('should update cart', () => {
    service.updateCart().subscribe((cart) => {
      expect(cart).toEqual(shoppingCart);
    })

    const updateCart = httpControler.expectOne(environment.api.url + `cart`);

    expect(updateCart.request.method).toEqual('PUT');

    updateCart.flush(shoppingCart);
  });

  it('should get flower from cart', () => {
    const flower = service.get(0);

    expect(flower).toEqual(shoppingCart.orderItems[0]);
  });

  it('should set in cart flower state', () => {
    service.setInCartFlowersState(flowers);

    expect(flowers[0].inCart).toEqual(true);
  });

  afterEach(() => {
    httpControler.verify();
  });
});
