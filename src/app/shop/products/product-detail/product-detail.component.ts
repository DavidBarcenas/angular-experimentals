import { Component, Input } from '@angular/core';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  @Input() productId = 0;
  product: Product | null = null;
  pageTitle = this.product ? `Product Detail for: ${this.product.productName}` : 'Product Detail';
  errorMessage = '';

  addToCart(product: Product): void {}
}
