import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Product } from '../product.interface';
import { CartService } from '../../cart/service/cart.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgOptimizedImage, CurrencyPipe],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [style({ opacity: 0 }), animate('100ms', style({ opacity: 1 }))]),
      transition(':leave', [animate('100ms', style({ opacity: 0 }))]),
    ]),
  ],
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;

  trigger = true;

  private cartService = inject(CartService);

  addToCart(event: Event) {
    event.stopPropagation();
    this.cartService.addToCart(this.product);
  }
}
