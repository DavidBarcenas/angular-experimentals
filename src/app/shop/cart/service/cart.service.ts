import { computed, Injectable, signal } from '@angular/core';
import { CartItem } from '../cart';
import { Product } from '../../products/product.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Manage state with signals
  cartItems = signal<CartItem[]>([]);
  // Number of items in the cart
  cartCount = computed(() => this.cartItems().reduce((accQty, item) => accQty + item.quantity, 0));

  // Add the vehicle to the cart
  // If the item is already in the cart, increase the quantity
  addToCart(product: Product) {
    const index = this.cartItems().findIndex((item) => item.product.id === product.id);
    if (index === -1) {
      // Not already in the cart, so add with default quantity of 1
      this.cartItems.update((items) => [...items, { product, quantity: 1 }]);
    } else {
      // Already in the cart, so increase the quantity by 1
      this.cartItems.update((items) => [
        ...items.slice(0, index),
        { ...items[index], quantity: items[index].quantity + 1 },
        ...items.slice(index + 1),
      ]);
    }
  }
}
