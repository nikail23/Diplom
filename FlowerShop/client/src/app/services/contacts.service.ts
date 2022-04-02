import { environment } from '../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  constructor(private http: HttpClient) {}

  sendMessage(body: any): Observable<any> {
    const url = environment.api.url + 'mail';
    return this.http.post(url, body, { responseType: 'text' });
  }
}
