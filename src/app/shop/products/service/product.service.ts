import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Product, Result } from '../product.interface';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { HttpErrorService } from '../../utilities/http-error.service';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { CategoryService } from './category.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private httpErrorService = inject(HttpErrorService);
  private categoryService = inject(CategoryService);

  private selectedProductId = signal<number | undefined>(undefined);
  imageSelected = signal<string | undefined>(undefined);

  private productsResult$: Observable<Result<Product[]>> = toObservable(
    this.categoryService.category
  ).pipe(
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
    switchMap((id) =>
      id ? this.http.get<Product>(`${environment.fakeStoreApi}/products/${id}`) : of(undefined)
    ),
    map((product) => {
      this.imageSelected.set(product?.images[0]);
      return { data: product };
    }),
    catchError((error) =>
      of({
        data: undefined,
        error: this.httpErrorService.formatError(error),
      })
    )
  );

  private productResult = toSignal(this.productResult$);
  product = computed(() => this.productResult()?.data);

  productSelected(id: number | undefined): void {
    this.selectedProductId.set(id);
  }
}
