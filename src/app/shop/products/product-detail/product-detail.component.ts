import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { ProductService } from '../service/product.service';
import { AsyncPipe, CurrencyPipe, NgClass } from '@angular/common';
import { CartService } from '../../cart/service/cart.service';
import { Product } from '../product.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [AsyncPipe, CurrencyPipe, NgClass],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  @Input()
  set id(productId: number) {
    this.productService.productSelected(productId);
  }

  private cartService = inject(CartService);
  private productService = inject(ProductService);

  imageSelected = this.productService.imageSelected;
  product = this.productService.product;

  errorMessage = '';

  changeImage(image: string): void {
    this.productService.imageSelected.set(image);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
