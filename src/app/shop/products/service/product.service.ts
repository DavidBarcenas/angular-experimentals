import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Product } from '../product.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private productSelectedSubject = new BehaviorSubject<number | undefined>(undefined);

  readonly products$ = this.http.get<Product[]>(`${environment.fakeStoreApi}/products`);
  readonly productSelected$ = this.productSelectedSubject.asObservable();

  productSelected(id: number) {
    this.productSelectedSubject.next(id);
  }
}
