import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Category, Product, Result } from '../product.interface';
import { catchError, filter, map, Observable, of, switchMap } from 'rxjs';
import { HttpErrorService } from '../../utilities/http-error.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private httpErrorService = inject(HttpErrorService);

  private category = signal<string | undefined>(undefined);
  private selectedProductId = signal<number | undefined>(undefined);
  imageSelected = signal<string | undefined>(undefined);

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

  private productsResult: Signal<Result<Product[]>> = toSignal(this.productsResult$, {
    initialValue: { data: [] },
  });

  readonly products = computed(() => this.productsResult()?.data);

  private productResult$ = toObservable(this.selectedProductId).pipe(
    filter(Boolean),
    switchMap((id) => this.http.get<Product>(`${environment.fakeStoreApi}/products/${id}`)),
    map((product) => ({ data: product })),
    catchError((error) =>
      of({
        data: undefined,
        error: this.httpErrorService.formatError(error),
      })
    )
  );

  private productResult = toSignal(this.productResult$);
  product = computed(() => this.productResult()?.data);

  readonly categories$ = this.http.get<Category[]>(`${environment.fakeStoreApi}/categories`);

  productSelected(id: number): void {
    this.selectedProductId.set(id);
  }

  filterByCategory(category?: string): void {
    this.category.set(category);
  }
}
