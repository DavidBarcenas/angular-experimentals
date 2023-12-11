import { Component, inject } from '@angular/core';
import { Product } from '../product.interface';
import { ProductService } from '../service/product.service';
import { catchError, EMPTY } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  private productService = inject(ProductService);

  product$ = this.productService.product$.pipe(
    catchError((error) => {
      this.errorMessage = error;
      return EMPTY;
    })
  );

  pageTitle = 'Product Detail for';
  errorMessage = '';

  addToCart(product: Product): void {}
}
