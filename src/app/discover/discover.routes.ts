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
      {
        path: 'content-projection',
        loadComponent: () =>
          import('./content-projection/content-projection.component').then(
            (c) => c.ContentProjectionComponent
          ),
      },
      { path: '', redirectTo: 'content-projection', pathMatch: 'full' },
    ],
  },
];
