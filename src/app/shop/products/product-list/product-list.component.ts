import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product.interface';
import { ProductDetailComponent } from '../product-detail/product-detail.component';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  private productService = inject(ProductService);
  products: Product[] = [];
  selectedProductId = 0;
  errorMessage = '';

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
