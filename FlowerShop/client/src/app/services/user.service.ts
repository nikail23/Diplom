import { UpdateUserDto, ChangePasswordDto } from '../classes/user';
import { from, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isLogged: boolean = false;

  constructor(
    private keycloakService: KeycloakService,
    private http: HttpClient
  ) {}

  public getLoggedState(): Observable<boolean> {
      // TODO
      // const isLoggedObservable$ = from(this.keycloakService.isLoggedIn());

      // return isLoggedObservable$.pipe(
      //   mergeMap((isLogged) => {
      //     this.isLogged = isLogged;
      //     if (!this.isLogged) {
      //       const tempId = localStorage.getItem('TEMP_ID');
      //       if (!tempId) {
      //         return this.http.get(environment.api.url + 'users/tempid', {
      //           responseType: 'text',
      //         });
      //       }
      //     }
      //     return of(undefined);
      //   }),
      //   map((tempId) => {
      //     if (tempId) {
      //       localStorage.setItem('TEMP_ID', tempId)
      //     }
      //     return this.isLogged;
      //   }),
      // );

      return of(true);
  }

  public getCurrentUserInfo(): Observable<any> {
    return this.http.get(environment.api.url + 'users/user');
  }

  public updateCurrentUser(updateUserDto: UpdateUserDto): Observable<any> {
    return this.http.patch(environment.api.url + 'users', updateUserDto);
  }

  public changePassword(password: ChangePasswordDto): Observable<any> {
    return this.http.post(
      environment.api.url + 'users/change_password',
      password
    );
  }

  public logOut(): void {
    if (this.isLogged) {
      this.keycloakService
        .logout(window.location.origin + '/home')
        .then(() => {});
    }
  }

  public logIn(): void {
    if (!this.isLogged) {
      this.keycloakService
        .login({
          redirectUri: window.location.origin + '/home',
        })
        .then(() => {});
    }
  }
}
