import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesServerService {

  constructor(private http: HttpClient) { }

  public getImage(name: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    });
    return this.http.get<Blob>(environment.api.url + `images/${name}`, {headers, responseType: 'blob' as 'json'});
  }
}
