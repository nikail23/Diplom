import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Flower } from 'src/app/conponents/home/flower';
import { Subscription, timer } from 'rxjs';
import { CatalogService } from 'src/app/services/catalog.service';

@Component({
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss'],
})
export class SearchDialogComponent implements OnInit, OnDestroy {
  public flowers: Flower[] = [];
  public isNotFoundError: boolean = false;
  public isLoading: boolean = false;

  public form = new FormGroup({
    search: new FormControl(),
  });

  private formSubscription: Subscription = Subscription.EMPTY;
  private timerSubscription: Subscription = Subscription.EMPTY;

  constructor(
    public dialogRef: MatDialogRef<SearchDialogComponent>,
    public catalogService: CatalogService,
  ) {
    this.formSubscription = this.form.valueChanges.subscribe((value) => {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = Subscription.EMPTY;
      this.search(value.search, 2000);
    });
  }

  ngOnDestroy(): void {
    this.formSubscription.unsubscribe();
    this.timerSubscription.unsubscribe();
  }

  ngOnInit(): void {}

  public close(): void {
    this.dialogRef.close();
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

  public flowerClicked() {
    this.close();
  }
}
