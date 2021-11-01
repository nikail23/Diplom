import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment.prod';

import { RegistrationService } from './registration.service';

describe('RegistrationService', () => {
  let service: RegistrationService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    service = TestBed.inject(RegistrationService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send right registration request', () => {
    const body = {
      firstName: 'Ilya',
      lastName: 'Yermolovich',
      email: 'nikail232323232323@gmail.com',
      homeAddress: 'Minsk',
      phone: '+375 29 858-36-75',
      password: 'Thvjkjdbx2000',
      shippingAddress: 'Minsk'
    };

    service.register(body).subscribe(
      (response) => {
        expect(response).toEqual({});
      }
    );

    const register = httpController.expectOne(environment.api.url + 'users/registration');

    expect(register.request.method).toBe("POST");

    register.flush({});
  });

  it('should send bad registration request', () => {
    const body = {
      firstName: '',
      lastName: '',
      email: '',
      homeAddress: '',
      phone: '',
      password: '',
      shippingAddress: ''
    }

    service.register(body).subscribe(
      () => {
        fail();
      },
      (error) => {
        expect(error.status).toEqual(400);
        expect(error.statusText).toEqual('Bad Request');
      }
    );

    const register = httpController.expectOne(environment.api.url + 'users/registration');

    expect(register.request.method).toBe("POST");

    register.flush({}, {status: 400, statusText: 'Bad Request'});
  });
});
