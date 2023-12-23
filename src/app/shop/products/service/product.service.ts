import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Category, Product, Result } from '../product.interface';
import { BehaviorSubject, catchError, filter, map, Observable, of, switchMap } from 'rxjs';
import { HttpErrorService } from '../../utilities/http-error.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private httpErrorService = inject(HttpErrorService);
  private productSelectedSubject = new BehaviorSubject<number | undefined>(undefined);
  private category = signal<string | undefined>(undefined);

  private productsResult$: Observable<Result<Product[]>> = toObservable(this.category).pipe(
    switchMap((category) => {
      const url = new URL(`${environment.fakeStoreApi}/products`);
      if (category) {
        url.searchParams.set('categoryId', category);
      }
      return this.http.get<Product[]>(url.toString());
    }),
    map((products) => ({ data: products })),
    catchError((error) =>
      of({
        data: [],
        error: this.httpErrorService.formatError(error),
      })
    )
  );

  private productsResult = toSignal(this.productsResult$, {
    initialValue: {
      data: [],
    },
  });

  readonly products = computed(() => this.productsResult()?.data);

  readonly productSelected$ = this.productSelectedSubject.asObservable();

  readonly product$ = this.productSelected$.pipe(
    filter(Boolean),
    switchMap((id) => this.http.get<Product>(`${environment.fakeStoreApi}/products/${id}`)),
    catchError((error) => this.httpErrorService.handleError(error))
  );

  readonly categories$ = this.http.get<Category[]>(`${environment.fakeStoreApi}/categories`);

  productSelected(id: number): void {
    this.productSelectedSubject.next(id);
  }

  filterByCategory(category?: string): void {
    this.category.set(category);
  }
}
