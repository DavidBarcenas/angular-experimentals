import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./home/home.component').then((c) => c.HomeComponent) },
  {
    path: 'shop',
    loadChildren: () => import('./shop/shop.routes').then((c) => c.routes),
  },
];
