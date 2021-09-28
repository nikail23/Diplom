import { environment } from '../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationServerService {

  constructor(private http: HttpClient) {}

  public register(formValue: any): Observable<any> {
    const url = environment.api.url + 'users/registration';
    const body = Object.assign({}, formValue);
    delete(body.repeatPassword);
    return this.http.post(url, body);
  }
}
