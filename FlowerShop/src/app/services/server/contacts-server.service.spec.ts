import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ContactsServerService } from './contacts-server.service';

describe('ContactsService', () => {
  let service: ContactsServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientModule ]
    });
    service = TestBed.inject(ContactsServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send right message', done => {
    const body = {
      name: 'Ilya',
      phone: '+375 29 858-36-75',
      text: 'Call me!'
    }
    service.sendMessage(body).subscribe(
      (response) => {
        expect(response).toBe('Your request has been registered. We will contact you as soon as possible.');
        done();
      }
    );
  });

  it('should send bad message', done => {
    const body = {
      name: '',
      phone: '',
      text: ''
    }
    service.sendMessage(body).subscribe(
      (response) => {},
      (error) => {
        expect(error.status).toBe(400);
        done();
      }
    );
  });
});
