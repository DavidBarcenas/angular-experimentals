import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../service/product.service';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CategoryService } from '../service/category.service';
import { CategoriesComponent } from '../../categories/categories.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductDetailComponent,
    ProductCardComponent,
    RouterLink,
    RouterLinkActive,
    CategoriesComponent,
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  @Input()
  set category_id(category: string | undefined) {
    this.categoryService.setCategory(category);
  }

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private router = inject(Router);

  readonly products = this.productService.products;

  errorMessage = '';

  onSelected(productId: number): void {
    this.router.navigate(['/shop/product/', productId]);
  }
}
