import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { Product } from '../product.interface';
import { HttpErrorService } from '../../utilities/http-error.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private productsUrl = 'api/productss';
  private http = inject(HttpClient);
  private httpErrorService = inject(HttpErrorService);

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.productsUrl)
      .pipe(catchError((error) => this.httpErrorService.handleError(error)));
  }

  getProduct(id: number): Observable<Product> {
    const productURL = `${this.productsUrl}/${id}`;
    return this.http
      .get<Product>(productURL)
      .pipe(catchError((error) => this.httpErrorService.handleError(error)));
  }
}
