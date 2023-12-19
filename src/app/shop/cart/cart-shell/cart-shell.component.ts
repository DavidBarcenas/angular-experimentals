import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../service/cart.service';

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

  addItems(quantity: number) {
    console.log(quantity + 1);
  }
}
