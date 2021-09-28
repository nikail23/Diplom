import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KeycloakTestingService {

  constructor() { }

  public isLoggedIn(): Promise<boolean> {
    return new Promise(() => {
      return true;
    });
  }

  public login(options?: Keycloak.KeycloakLoginOptions): Promise<void> {
    return new Promise(() => {
      console.log('test login');
    });
  }

  public logout(redirectUri?: string): Promise<void> {
    return new Promise(() => {
      console.log('test logout');
    });
  }
}
