import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CartListComponent } from '../cart-list/cart-list.component';
import { CartSummaryComponent } from '../cart-summary/cart-summary.component';

@Component({
  selector: 'app-cart-shell',
  standalone: true,
  imports: [CartListComponent, CartSummaryComponent],
  templateUrl: './cart-shell.component.html',
  styleUrl: './cart-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartShellComponent {}
