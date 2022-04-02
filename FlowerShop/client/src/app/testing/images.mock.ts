import { of } from 'rxjs';
import { ImagesService } from './../services/images.service';

export const imagesSpy = jasmine.createSpyObj<ImagesService>('ImagesService', ['getImage']);
imagesSpy.getImage.and.returnValue(of(new Blob()))
