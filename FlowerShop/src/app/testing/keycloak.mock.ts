import { KeycloakService } from 'keycloak-angular';
import { KeycloakLoginOptions } from 'keycloak-js';

export const keycloakSpy = jasmine.createSpyObj<KeycloakService>('KeycloakService', [
  'login',
  'logout',
  'isLoggedIn'
]);
keycloakSpy.isLoggedIn.and.returnValue(new Promise((resolve) => {resolve(true)}));
keycloakSpy.logout.and.callFake((redirectUri?: string) => new Promise((resolve) => resolve()));
keycloakSpy.login.and.callFake((options?: KeycloakLoginOptions) => new Promise((resolve) => resolve()));
