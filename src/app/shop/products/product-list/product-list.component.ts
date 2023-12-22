import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../service/product.service';
import { catchError, EMPTY } from 'rxjs';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent, ProductCardComponent, RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  @Input()
  set category_id(category: string | undefined) {
    this.productService.filterByCategory(category);
  }

  private productService = inject(ProductService);
  private router = inject(Router);

  readonly products$ = this.productService.products$.pipe(
    catchError((error) => {
      this.errorMessage = error;
      return EMPTY;
    })
  );

  readonly categories$ = this.productService.categories$;

  errorMessage = '';

  onSelected(productId: number): void {
    this.productService.productSelected(productId);
    this.router.navigate(['/shop/product/', productId]);
  }
}
