import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../service/product.service';
import { catchError, EMPTY } from 'rxjs';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent, ProductCardComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  private productService = inject(ProductService);

  readonly products$ = this.productService.products$.pipe(
    catchError((error) => {
      this.errorMessage = error;
      return EMPTY;
    })
  );

  readonly selectedProductId$ = this.productService.productSelected$;

  errorMessage = '';

  onSelected(productId: number): void {
    this.productService.productSelected(productId);
  }
}
