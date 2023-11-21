import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../product.interface';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductDetailComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
})
export class ProductListComponent {
  products: Product[] = [];
  selectedProductId = 0;
  errorMessage = '';

  onSelected(productId: number): void {
    this.selectedProductId = productId;
  }
}
