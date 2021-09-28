import { Component } from '@angular/core';
import { Path } from '../shared/navigation/path';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent {
  public readonly paths: Path[] = [
    {name: 'Home', routerLink: '/home'},
    {name: 'Contacts', routerLink: '/contacts'},
  ];
}
