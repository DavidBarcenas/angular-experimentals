import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category, Result } from '../product.interface';
import { environment } from '../../../../environments/environment';
import { toSignal } from '@angular/core/rxjs-interop';
import { catchError, map, of } from 'rxjs';
import { HttpErrorService } from '../../utilities/http-error.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private http = inject(HttpClient);
  private httpErrorService = inject(HttpErrorService);

  private readonly categories$ = this.http
    .get<Category[]>(`${environment.fakeStoreApi}/categories`)
    .pipe(
      map((categories) => ({ data: categories })),
      catchError((error) =>
        of({
          data: [],
          error: this.httpErrorService.formatError(error),
        })
      )
    );

  private readonly categoriesResult: Signal<Result<Category[]>> = toSignal(this.categories$, {
    initialValue: { data: [] },
  });

  readonly categories = computed(() => this.categoriesResult()?.data);

  category = signal<string | undefined>(undefined);

  setCategory(category?: string): void {
    this.category.set(category);
  }
}
