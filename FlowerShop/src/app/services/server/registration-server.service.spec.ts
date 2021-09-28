import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { RegistrationServerService } from './registration-server.service';

describe('RegistrationService', () => {
  let service: RegistrationServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(RegistrationServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send right registration request', done => {
    const body = {
      firstName: 'Ilya',
      lastName: 'Yermolovich',
      email: 'nikail232323232323@gmail.com',
      homeAddress: 'Minsk',
      phone: '+375 29 858-36-75',
      password: 'Thvjkjdbx2000',
      shippingAddress: 'Minsk'
    }
    service.register(body).subscribe(
      (response) => {
        expect(response.status === 200).toBeTrue();
        done();
      },
      (error) => {
        expect(error.status === 403).toBeTrue();
        done();
      }
    );
  });

  it('should send bad registration request', done => {
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
      (response) => {},
      (error) => {
        expect(error.status).toBe(400);
        done();
      }
    );
  });
});
