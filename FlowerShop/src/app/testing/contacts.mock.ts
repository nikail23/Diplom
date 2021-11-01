import { of } from 'rxjs';
import { ContactsService } from 'src/app/services/contacts.service';

export const contactsServiceSpy = jasmine.createSpyObj<ContactsService>('ContactsService', ['sendMessage']);
contactsServiceSpy.sendMessage.and.returnValue(of('Success'));
