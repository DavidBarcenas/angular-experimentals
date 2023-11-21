import { Routes } from '@angular/router';
import { ShopComponent } from './shop.component';

export const routes: Routes = [
  {
    path: '',
    component: ShopComponent,
    children: [
      {
        path: 'products',
        loadComponent: () =>
          import('./products/product-list/product-list.component').then(
            (c) => c.ProductListComponent
          ),
      },
      {
        path: 'cart',
        loadComponent: () =>
          import('./cart/cart-shell/cart-shell.component').then((c) => c.CartShellComponent),
      },
      { path: '', redirectTo: 'products', pathMatch: 'full' },
    ],
  },
];
