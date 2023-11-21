import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ShopData } from './shop/shop.data';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(InMemoryWebApiModule.forRoot(ShopData, { delay: 1000 })),
    provideRouter(routes),
  ],
};
