import { getTestUserDto } from './user.mock';
import { RegistrationService } from '../services/registration.service';
import { of } from 'rxjs';

export const testRegistrationDto = {
  firstName: 'Ilya',
  lastName: 'Yermolovich',
  email: 'email@gmail.com',
  homeAddress: 'Minsk',
  phone: '+375 29 777-77-77',
  password: 'thvjkjdbx',
  repeatPassword: 'thvjkjdbx',
}

export const registrationServiceSpy = jasmine.createSpyObj<RegistrationService>('RegistrationService', ['register']);
registrationServiceSpy.register.and.returnValue(of(getTestUserDto()));
