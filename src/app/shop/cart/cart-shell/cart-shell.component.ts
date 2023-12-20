import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../service/cart.service';
import { CartItem } from '../cart';

@Component({
  selector: 'app-cart-shell',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-shell.component.html',
  styleUrl: './cart-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartShellComponent {
  private cartService = inject(CartService);
  cartItems = this.cartService.cartItems;
  subTotal = this.cartService.subTotal;
  deliveryFee = this.cartService.deliveryFee;
  tax = this.cartService.tax;
  total = this.cartService.total;

  addQuantity(cartItem: CartItem): void {
    this.cartService.updateQuantity(cartItem, cartItem.quantity + 1);
  }

  subtractQuantity(cartItem: CartItem): void {
    if (cartItem.quantity > 1) {
      this.cartService.updateQuantity(cartItem, cartItem.quantity - 1);
    }
  }

  removeFromCart(cartItem: CartItem): void {
    this.cartService.removeFromCart(cartItem);
  }
}
