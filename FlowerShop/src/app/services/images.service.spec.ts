import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { ImagesService } from './images.service';

describe('ImagesService', () => {
  let service: ImagesService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ImagesService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get image blob', () => {
    const blob = new Blob();
    const name = 'name';

    service.getImage(name).subscribe((receivedBlob) => {
      expect(blob).toEqual(receivedBlob);
    });

    const getBlob = httpController.expectOne(environment.api.url + `images/${name}`);

    expect(getBlob.request.method).toEqual('GET');

    getBlob.flush(blob);
  });
});
