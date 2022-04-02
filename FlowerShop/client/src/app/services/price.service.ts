import { PriceDto } from 'src/app/classes/flower';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PriceService {

  constructor(private http: HttpClient) { }

  public get(itemId: number): Observable<PriceDto[]> {
    return this.http.get(environment.api.url + `price/${itemId}`) as Observable<PriceDto[]>
  }
}
