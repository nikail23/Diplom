import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CatalogServerService {
  constructor(private http: HttpClient) {}

  public getAll(
    direction?: string,
    page?: number,
    size?: number,
    sortProperty?: string
  ): Observable<any> {
    const params = new HttpParams();
    if (direction) {
      params.set('direction', direction);
    }
    if (page) {
      params.set('page', page);
    }
    if (size) {
      params.set('size', size);
    }
    if (sortProperty) {
      params.set('sortProperty', sortProperty);
    }
    return this.http.get(environment.api.url + 'items', {params});
  }

  public get(id: number): Observable<any> {
    return this.http.get(environment.api.url + `items/${id}`);
  }

  public search(name: string): Observable<any> {
    const params = {name};
    return this.http.get(environment.api.url + 'items/search', {params});
  }
}
