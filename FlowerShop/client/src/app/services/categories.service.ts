import { DomSanitizer } from '@angular/platform-browser';
import { mergeMap, switchMap, map } from 'rxjs/operators';
import { ImagesService } from './images.service';
import { CategoriesResponseDto, CategoryDto } from './../classes/categories';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(
    private imagesServerService: ImagesService,
    private sanitazer: DomSanitizer,
    private http: HttpClient
  ) {}

  public getAll() {
    return (this.http.get(environment.api.url + 'categories') as Observable<CategoriesResponseDto>)
      .pipe(mergeMap((response) => this.loadAndSetImages(response)));
  }

  private loadAndSetImages(
    response: CategoriesResponseDto
  ): Observable<CategoriesResponseDto> {
    return forkJoin(this.getLoadImagesObservables(response)).pipe(
      switchMap((loadedImages: Blob[]) =>
        forkJoin(this.getSetImagesObservables(response, loadedImages))
      ),
      map(() => response)
    );
  }

  private getLoadImagesObservables(
    response: CategoriesResponseDto
  ): Observable<Blob>[] {
    const imagesObservables$: Observable<Blob>[] = [];

    response.content.forEach((category: CategoryDto) => {
      imagesObservables$.push(
        this.imagesServerService.getImage(category.photo)
      );
    });

    return imagesObservables$;
  }

  private getSetImagesObservables(
    response: CategoriesResponseDto,
    loadedImages: Blob[]
  ): Observable<any>[] {
    const setImagesObservables$: Observable<any>[] = [];

    response.content.forEach((category: CategoryDto, index: number) => {
      setImagesObservables$.push(
        this.setCategoryImage(category, loadedImages[index])
      );
    });

    return setImagesObservables$;
  }

  private setCategoryImage(category: CategoryDto, blob: Blob): Observable<any> {
    return new Observable((subscriber) => {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          const base64data = reader.result;
          const safeSrc = this.sanitazer.bypassSecurityTrustUrl(
            '' + base64data
          );
          category.loadedPhoto = safeSrc;
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
