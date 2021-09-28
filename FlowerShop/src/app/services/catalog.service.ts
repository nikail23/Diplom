import { ImagesServerService } from './server/images-server.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CatalogServerService } from 'src/app/services/server/catalog-server.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Flower } from '../conponents/home/flower';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  constructor(private catalogServerService: CatalogServerService, private sanitazer: DomSanitizer, private imagesService: ImagesServerService) { }

  public getAll(
    direction?: string,
    page?: number,
    size?: number,
    sortProperty?: string
  ): Observable<{flowers: Flower[], response: any}> {
    return new Observable((subscriber) => {
      this.catalogServerService.getAll(direction, page, size, sortProperty).subscribe(
        (response: any) => {
          this.convertGetResponseToFlowersList(response).subscribe((flowers: Flower[]) => {
            subscriber.next({flowers, response});
            subscriber.complete();
          });
        },
        (error) => {
          subscriber.error(error);
        });
    });
  }

  public get(id: number): Observable<Flower> {
    return new Observable((subscriber) => {
      this.catalogServerService.get(id).subscribe(
        (response: any) => {
          this.convertGetResponseToFlower(response).subscribe((flower: Flower) => {
            subscriber.next(flower);
            subscriber.complete();
          });
        },
        (error) => {
          subscriber.error(error);
        });
    });
  }

  public search(name: string): Observable<any> {
    return new Observable((subscriber) => {
      this.catalogServerService.search(name).subscribe(
        (response: any) => {
          this.convertSearchResponseToFlowerList(response).subscribe((flowerList: Flower[]) => {
            subscriber.next(flowerList);
            subscriber.complete();
          });
        },
        (error) => {
          subscriber.error(error);
        });
    });
  }

  private convertGetResponseToFlowersList(response: any): Observable<Flower[]> {
    return new Observable((subscriber) => {
      const flowers: Flower[] = response.content.map((value: any) => {
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
          inCart: false
        };
        return flower;
      });
      flowers.forEach(flower => {
        this.imagesService.getImage(flower.photo).subscribe((blob: Blob) => {
          this.setFlowerImage(blob, flower).subscribe(() => {});
        });
      });
      subscriber.next(flowers);
      subscriber.complete();
    });
  }

  private convertGetResponseToFlower(value: any): Observable<Flower> {
    return new Observable((subscriber) => {
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
        inCart: false
      };
      this.imagesService.getImage(flower.photo).subscribe((blob: Blob) => {
        this.setFlowerImage(blob, flower).subscribe(() => {
          subscriber.next(flower);
          subscriber.complete();
        });
      });
    });
  }

  private convertSearchResponseToFlowerList(response: any): Observable<Flower[]> {
    const fakeGetResponse = {content: response};
    return this.convertGetResponseToFlowersList(fakeGetResponse);
  }

  private setFlowerImage(blob: Blob, flower: Flower): Observable<any> {
    return new Observable((subscriber) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const base64data = reader.result;
        const safeSrc = this.sanitazer.bypassSecurityTrustUrl('' + base64data);
        flower.loadedPhoto = safeSrc;
        subscriber.next();
        subscriber.complete();
      }, false);
      if (blob) {
        reader.readAsDataURL(blob);
      }
    });
  }
}
