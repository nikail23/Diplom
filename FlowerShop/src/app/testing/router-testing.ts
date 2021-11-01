import { Params } from '@angular/router';
import { Observable } from 'rxjs';

export class ActivatedTestingRoute {
  snapshot = {
    params: {
      id: 0,
    },
  };
  params: Observable<Params> = new Observable((subscriber) => {
    subscriber.next({
      id: 0,
    });
    subscriber.complete();
  });
}
