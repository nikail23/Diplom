import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ContactsService } from './contacts.service';

describe('ContactsService', () => {
  let service: ContactsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ContactsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send right message', () => {
    const body = {
      name: 'Ilya',
      phone: '+375 29 858-36-75',
      text: 'Call me!'
    }

    service.sendMessage(body).subscribe(
      (response) => {
        expect(response).toBe('Your request has been registered. We will contact you as soon as possible.');
      }
    );

    let sendMail = httpMock.expectOne(environment.api.url + 'mail');

    expect(sendMail.request.method).toBe("POST");

    sendMail.flush('Your request has been registered. We will contact you as soon as possible.');
  });

  it('should send bad message', () => {
    const body = {
      name: '',
      phone: '',
      text: ''
    }

    service.sendMessage(body).subscribe(
      () => {
        fail()
      },
      (error) => {
        expect(error.status).toEqual(400);
        expect(error.statusText).toEqual('Bad Request');
      }
    );

    const sendMail = httpMock.expectOne(environment.api.url + 'mail');

    expect(sendMail.request.method).toBe("POST");

    sendMail.flush({}, {status: 400, statusText: 'Bad Request'});
  });
});
