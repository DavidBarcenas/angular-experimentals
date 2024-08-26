import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dynamic-component',
        loadComponent: () =>
          import('./dynamic-component/dynamic-component.component').then(
            (c) => c.DynamicComponentComponent
          ),
      },
      { path: '', redirectTo: 'dynamic-component', pathMatch: 'full' },
    ],
  },
];
