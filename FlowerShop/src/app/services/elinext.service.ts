import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ElinextService {
  public redirectToElinext() {
    window.location.href = 'https://www.elinext.com/';
  }
}
