import { environment } from './../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserServerService {

  constructor(private http: HttpClient) { }

  public getTempId(): Observable<any> {
    return this.http.get(environment.api.url + 'users/tempid', {responseType: 'text'});
  }

  public getCurrentUser(): Observable<any> {
    return this.http.get(environment.api.url + 'users/user');
  }

  public updateCurrentUser(updateUserDto: any): Observable<any> {
    return this.http.patch(environment.api.url + 'users', updateUserDto);
  }

  public changePassword(newPassword: string): Observable<any> {
    return this.http.post(environment.api.url + 'users/change_password', newPassword);
  }
}
