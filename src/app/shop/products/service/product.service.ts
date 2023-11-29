import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  BehaviorSubject,
  catchError,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  switchMap,
} from 'rxjs';
import { Product } from '../product.interface';
import { HttpErrorService } from '../../utilities/http-error.service';
import { ReviewsService } from '../../reviews/service/reviews.service';
import { Review } from '../../reviews/review.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/products';

  private http = inject(HttpClient);
  private httpErrorService = inject(HttpErrorService);
  private reviewsService = inject(ReviewsService);

  private productSelectedSubject = new BehaviorSubject<number | undefined>(undefined);
  readonly productSelected$ = this.productSelectedSubject.asObservable();

  readonly products$ = this.http.get<Product[]>(this.productsUrl).pipe(
    shareReplay(1),
    catchError((error) => this.httpErrorService.handleError(error))
  );

  readonly product$ = this.productSelected$.pipe(
    filter(Boolean),
    switchMap((id) => {
      const productUrl = this.productsUrl + '/' + id;
      return this.http.get<Product>(productUrl).pipe(
        switchMap((product) => this.getProductWithReviews(product)),
        catchError((error) => this.httpErrorService.handleError(error))
      );
    })
  );

  productSelected(id: number): void {
    this.productSelectedSubject.next(id);
  }

  private getProductWithReviews(product: Product): Observable<Product> {
    if (product.reviews) {
      return this.http
        .get<Review[]>(this.reviewsService.getReviewUrl(product.id))
        .pipe(map((reviews) => ({ ...product, reviews })));
    }
    return of(product);
  }
}
