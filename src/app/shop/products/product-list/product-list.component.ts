import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../service/product.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  private productService = inject(ProductService);
  private destroyRef = inject(DestroyRef);

  readonly products$ = this.productService.products$.pipe(
    takeUntilDestroyed(this.destroyRef),
    catchError((error) => {
      this.errorMessage = error;
      return EMPTY;
    })
  );

  selectedProductId = 0;
  errorMessage = '';

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
