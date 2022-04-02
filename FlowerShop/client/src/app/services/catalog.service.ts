import { Flower } from 'src/app/classes/flower';
import { FlowersResponseDto } from './../classes/flower';
import { ProductsParameters } from '../classes/products-parameters';
import { ImagesService } from './images.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CatalogService {
  constructor(
    private sanitazer: DomSanitizer,
    private imagesService: ImagesService,
    private http: HttpClient
  ) {}

  public getAll(
    parameters?: ProductsParameters
  ): Observable<FlowersResponseDto> {
    const params = parameters ?? {};

    return this.http.get(environment.api.url + 'items'/*, { params }*/)
      .pipe(
        mergeMap((response) =>
          this.convertGetResponseToFlowersResponse(response)
        )
      );
  }

  public get(id: number): Observable<Flower> {
    return this.http.get(environment.api.url + `items/${id}`)
      .pipe(mergeMap((result) => this.convertGetResponseToFlower(result)));
  }

  public search(name: string): Observable<FlowersResponseDto> {
    return this.http.get(environment.api.url + 'items/search', { params: {name} })
      .pipe(
        mergeMap((result) =>
          this.convertSearchResponseToFlowerResponseDto(result)
        )
      );
  }

  private getFlowersLoadImagesObservable(flowers: Flower[]) {
    const observables$: Observable<any>[] = [];

    flowers.forEach(flower => {
      observables$.push(this.imagesService.getImage(flower.photo).pipe(
        mergeMap((blob) => this.setFlowerImage(blob, flower))
      ));
    });

    return forkJoin(observables$);
  }

  private convertGetResponseToFlowersResponse(
    response: any
  ): Observable<FlowersResponseDto> {
      const flowers: Flower[] = response.flowers.map((value: any) => {
        const flower: Flower = {
          category: value.category,
          id: value.id,
          name: value.name,
          description: value.description,
          shortDescription: value.shortDescription,
          priceDto: value.priceDto,
          thumbnail: value.thumbnail,
          photo: value.photo,
          loadedPhoto: '',
          inCart: false,
        };
        return flower;
      });
      return this.getFlowersLoadImagesObservable(flowers).pipe(
        map(() => {
          return { flowers, response };
        })
      );
  }

  private convertGetResponseToFlower(value: any): Observable<Flower> {
    const flower: Flower = {
      category: value.category,
      id: value.id,
      name: value.name,
      description: value.description,
      shortDescription: value.shortDescription,
      priceDto: value.priceDto,
      thumbnail: value.thumbnail,
      photo: value.photo,
      loadedPhoto: '',
      inCart: false,
    };
    return this.imagesService
      .getImage(flower.photo)
      .pipe(
        mergeMap((blob) => this.setFlowerImage(blob, flower)),
        map(() => flower)
      );
  }

  private convertSearchResponseToFlowerResponseDto(
    response: any
  ): Observable<FlowersResponseDto> {
    const fakeGetResponse = { content: response };
    return this.convertGetResponseToFlowersResponse(fakeGetResponse);
  }

  private setFlowerImage(blob: Blob, flower: Flower): Observable<any> {
    return new Observable((subscriber) => {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          const base64data = reader.result;
          const safeSrc = this.sanitazer.bypassSecurityTrustUrl(
            '' + base64data
          );
          flower.loadedPhoto = safeSrc;
          subscriber.next();
          subscriber.complete();
        },
        false
      );
      if (blob) {
        reader.readAsDataURL(blob);
      }
    });
  }
}
