import { UpdateUserDto } from './user';
import { Observable } from 'rxjs';
import { UserServerService } from './server/user-server.service';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private isLogged?: boolean;

  constructor(
    private keycloakService: KeycloakService,
    private userServerService: UserServerService,
  ) {}

  public getLoggedState(): Observable<boolean> {
    return new Observable((subscriber) => {
      this.keycloakService.isLoggedIn().then((isLogged: boolean) => {
        this.isLogged = isLogged;
        if (!this.isLogged) {
          const tempId = localStorage.getItem('TEMP_ID');
          if (tempId) {
            subscriber.next(this.isLogged);
            subscriber.complete();
          } else {
            this.userServerService.getTempId().subscribe((value) => {
              localStorage.setItem("TEMP_ID", value);
              subscriber.next(this.isLogged);
              subscriber.complete();
            });
          }
        } else {
          subscriber.next(this.isLogged);
          subscriber.complete();
        }
      });
    });
  }

  public getCurrentUserInfo(): Observable<any> {
    return this.userServerService.getCurrentUser();
  }

  public updateCurrentUser(updateUserDto: UpdateUserDto): Observable<any> {
    return this.userServerService.updateCurrentUser(updateUserDto);
  }

  public changePassword(newPassword: string): Observable<any> {
    return this.userServerService.changePassword(newPassword);
  }

  public logOut(): void {
    if (this.isLogged) {
      this.keycloakService.logout(window.location.origin + '/home');
    }
  }

  public logIn(): void {
    if (!this.isLogged) {
      this.keycloakService.login({
        redirectUri: window.location.origin + '/home',
      });
    }
  }
}
