import { UpdateUserDto, ChangePasswordDto } from '../classes/user';
import { from, Observable, of, ReplaySubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { map, mergeMap, tap } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public isLogged: boolean = false;

  public get loggedState(): Observable<boolean> {
    return this._loggedState.asObservable();
  }

  public get userId(): number | undefined {
    return this._userId;
  }

  private _loggedState: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);
  private _userId?: number;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => {
    //   return false;
    // };
  }

  public updateLoggedState(): void {
    const userId = localStorage.getItem('USER_ID');

    if (!userId) {
      const tempId = localStorage.getItem('TEMP_ID');
      if (!tempId) {
        this.http.get(environment.api.url + 'users/tempid', {responseType: 'text'})
          .subscribe((tempId: string) => {
            localStorage.setItem('TEMP_ID', tempId);
          });
      } else {
        localStorage.removeItem('TEMP_ID');
      }

      this.isLogged = false;
      this._loggedState.next(false);
    } else {
      this._userId = parseInt(userId);
      this.isLogged = true;
      this._loggedState.next(true);
    }
  }

  public getCurrentUserInfo(): Observable<any> {
    const params: HttpParams = this._userId ? new HttpParams().append('id', this._userId) : new HttpParams();

    return this.http.get(environment.api.url + 'users/user', {params});
  }

  public updateCurrentUser(updateUserDto: UpdateUserDto): Observable<any> {
    const params: HttpParams = this._userId ? new HttpParams().append('id', this._userId) : new HttpParams();

    return this.http.post(environment.api.url + 'users/user', updateUserDto, {params});
  }

  public changePassword(password: ChangePasswordDto): Observable<any> {
    const params: HttpParams = this._userId ? new HttpParams().append('id', this._userId) : new HttpParams();

    return this.http.post(
      environment.api.url + 'users/change_password',
      password,
      {params}
    );
  }

  public logOut(): void {
    if (this.isLogged) {
      localStorage.removeItem('USER_ID');
      this.updateLoggedState();
      this.router.navigate(['home']);
    }
  }

  public logIn(): void {
    if (!this.isLogged) {
      this.router.navigate(['log-in']);
    }
  }
}
