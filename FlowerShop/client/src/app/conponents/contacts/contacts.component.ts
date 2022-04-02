import { environment } from './../../../environments/environment.prod';
import { Component } from '@angular/core';
import { Path } from '../../classes/path';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})
export class ContactsComponent {
  public readonly GoogleMapUrl = `https://www.google.com/maps/embed/v1/place?key=${environment.googleMapsApi.key}&q=Кальварийская+19`;

  public readonly paths: Path[] = [
    { name: 'Home', routerLink: '/home' },
    { name: 'Contacts', routerLink: '/contacts' },
  ];
}
