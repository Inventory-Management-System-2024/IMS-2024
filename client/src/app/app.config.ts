import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { IMAGE_CONFIG } from '@angular/common';
import { provideState, provideStore } from '@ngrx/store';
import { cartReducer } from './states/cart/cart.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {

  providers: [provideRouter(routes), provideHttpClient(), provideHttpClient(withFetch()), provideClientHydration(), provideAnimations(), provideToastr(),
  {
    provide: IMAGE_CONFIG,
    useValue: {
      disableImageSizeWarning: true,
      disableImageLazyLoadWarning: true
    }
  },provideStore(), provideState({ name: "cart", reducer: cartReducer }), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
}