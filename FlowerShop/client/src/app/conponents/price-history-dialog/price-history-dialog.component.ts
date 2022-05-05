import { Flower } from 'src/app/classes/flower';
import { CatalogService } from 'src/app/services/catalog.service';
import { PriceDto } from './../../classes/flower';
import { PriceService } from './../../services/price.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SeriesOptionsType } from 'highcharts';
import { Chart } from 'angular-highcharts';
import { options } from './chart-options';
import { forkJoin } from 'rxjs';

export enum ChartTimeType {
  ONE_MONTH,
  SIX_MONTH,
}

@Component({
  templateUrl: './price-history-dialog.component.html',
  styleUrls: ['./price-history-dialog.component.scss'],
})
export class PriceHistoryDialogComponent implements OnInit {
  public ChartTimeType = ChartTimeType;
  public selectedChartTimeType: ChartTimeType = ChartTimeType.ONE_MONTH;

  public currentPrice: PriceDto = {
    id: -1,
    price: 0,
    date: '',
    itemId: -1
  };
  public chart = new Chart(options);

  private priceHistory: PriceDto[] = []

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<PriceHistoryDialogComponent>,
    private priceService: PriceService,
    private catalogService: CatalogService
  ) {}

  ngOnInit(): void {
    const itemId = this.data.id;
    if (itemId) {
      forkJoin([this.catalogService.get(itemId), this.priceService.get(itemId)]).subscribe(([flower, priceHistory]) => {
        this.currentPrice = flower.priceDto;
        this.priceHistory = priceHistory;
        this.fillChart(priceHistory);
      })
    }
  }

  private getCategoryFromDate(priceDate: Date): string {
    const date = priceDate.getDate() < 10 ? `0${priceDate.getDate()}` : priceDate.getDate();
    const month = (priceDate.getMonth() + 1) < 10 ? `0${priceDate.getMonth() + 1}` : priceDate.getMonth() + 1;
    return `${date}.${month}`;
  }

  private fillChart(priceHistory: PriceDto[]) {
    this.chart.removeSeries(0);
    this.chart.ref.xAxis[0].setCategories([]);

    const series: SeriesOptionsType = {
      data: [],
      type: 'areaspline',
      dataLabels: {
        enabled: true,
      }
    };
    const categories: string[] = [];
    const limitationDate: Date = new Date();
    let dayInterval = 0;
    let lastDate: Date = new Date(this.currentPrice.date);

    switch(this.selectedChartTimeType) {
      case ChartTimeType.ONE_MONTH: {
        limitationDate.setMonth(limitationDate.getMonth() - 1);
        dayInterval = 3;
      };
      break;
      case ChartTimeType.SIX_MONTH: {
        limitationDate.setMonth(limitationDate.getMonth() - 6);
        dayInterval = 18;
      }
      break;
    }

    priceHistory.forEach(price => {
      const priceDate = new Date(price.date);
      console.log(priceDate);
      if (priceDate > limitationDate && +priceDate < Date.now()) {
        categories.push(this.getCategoryFromDate(priceDate));
        lastDate = priceDate;
        series.data?.push([false, price.price]);
      }
    });

    categories.reverse()
    series.data?.reverse();

    if (series.data && series.data.length < 10) {
      if (series.data.length === 0) {
        const priceDate = new Date(this.currentPrice.date);
        categories.push(this.getCategoryFromDate(priceDate));
        series.data?.push(this.currentPrice.price);
      }

      while (series.data.length < 10) {
        lastDate.setDate(lastDate.getDate() - dayInterval);
        series.data?.push(this.currentPrice.price);
        categories.push(this.getCategoryFromDate(lastDate));
      }

      categories.reverse();
      series.data.reverse();
    }

    this.chart.addSeries(series, true, false);
    this.chart.ref.xAxis[0].setCategories(categories);
  }

  public changeSelectedChartTimeType(chartTimeType: ChartTimeType) {
    this.selectedChartTimeType = chartTimeType;
    this.fillChart(this.priceHistory);
  }

  public close() {
    this.dialogRef.close();
  }
}
