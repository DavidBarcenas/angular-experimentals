import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
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

  readonly products$ = this.http
    .get<Product[]>(this.productsUrl)
    .pipe(catchError((error) => this.httpErrorService.handleError(error)));

  getProduct(id: number): Observable<Product> {
    const productURL = `${this.productsUrl}/${id}`;
    return this.http.get<Product>(productURL).pipe(
      switchMap((product) => this.getProductWithReviews(product)),
      catchError((error) => this.httpErrorService.handleError(error))
    );
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
