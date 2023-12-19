import { Component, inject, Input } from '@angular/core';
import { ProductService } from '../service/product.service';
import { AsyncPipe, CurrencyPipe } from '@angular/common';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  @Input()
  set id(productId: number) {
    this.productService.productSelected(productId);
  }

  private productService = inject(ProductService);

  product$ = this.productService.product$.pipe(
    catchError((error) => {
      this.errorMessage = error;
      return EMPTY;
    })
  );

  pageTitle = 'Product Detail for';
  errorMessage = '';

  addToCart(product: any): void {}
}
