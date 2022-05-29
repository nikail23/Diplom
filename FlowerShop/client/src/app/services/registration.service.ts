import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private http: HttpClient) {}

  public register(formValue: any): Observable<any> {
    const url = environment.api.url + 'users/register';
    const body = Object.assign({}, formValue);
    delete body.repeatPassword;
    return this.http.post(url, body);
  }

  public logIn(formValue: any): Observable<any> {
    const url = environment.api.url + 'users/login';
    const body = Object.assign({}, formValue);
    delete body.repeatPassword;
    return this.http.post(url, body);
  }
}
