import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import { CatalogService } from 'src/app/services/catalog.service';
import { Flower } from '../home/flower';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnDestroy {
  public flowers: Flower[] = [];
  public isNotFoundError: boolean = false;
  public isLoading: boolean = false;

  public form = new FormGroup({
    search: new FormControl(),
  });

  private formSubscription: Subscription = Subscription.EMPTY;
  private timerSubscription: Subscription = Subscription.EMPTY;

  constructor(public catalogService: CatalogService) {
    this.formSubscription = this.form.valueChanges.subscribe((value: any) => {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = Subscription.EMPTY;
      this.search(value.search, 2000);
    });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
    this.timerSubscription.unsubscribe();
  }

  private search(name: string, delay: number): void {
    this.isLoading = true;
    this.timerSubscription = timer(delay).subscribe(() => {
      this.catalogService.search(name).subscribe(
        (flowers: Flower[]) => {
          this.flowers = flowers;
        },
        (error) => {
          if (error.status === 404) {
            this.isNotFoundError = true;
          }
        },
        () => {
          this.isLoading = false;
        }
      );
    });
  }
}
