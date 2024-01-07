import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../service/cart.service';
import { CartItem } from '../cart';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartListComponent {
  private cartService = inject(CartService);
  cartItems = this.cartService.cartItems;

  addQuantity(cartItem: CartItem): void {
    this.cartService.updateQuantity(cartItem, cartItem.quantity + 1);
  }
  removeFromCart(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem);
  }

  subtractQuantity(cartItem: CartItem): void {
    if (cartItem.quantity > 1) {
      this.cartService.updateQuantity(cartItem, cartItem.quantity - 1);
    }
  }
}
