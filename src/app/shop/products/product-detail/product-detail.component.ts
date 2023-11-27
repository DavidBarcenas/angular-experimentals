import { Component, DestroyRef, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../product.interface';
import { ProductService } from '../service/product.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnChanges {
  @Input() productId = 0;

  private productService = inject(ProductService);
  private destroyRef = inject(DestroyRef);

  product: Product | null = null;
  pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';
  errorMessage = '';

  ngOnChanges(changes: SimpleChanges): void {
    const id = changes['productId'].currentValue;
    if (id) {
      this.productService
        .getProduct(this.productId)
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          catchError((error) => {
            this.errorMessage = error;
            return EMPTY;
          })
        )
        .subscribe((product) => (this.product = product));
    }
  }

  addToCart(product: Product): void {}
}
