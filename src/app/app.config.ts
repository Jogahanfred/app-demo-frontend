import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

import { routes } from './app.routes';
import { MessageService } from 'primeng/api';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { provideHttpClient, withFetch } from '@angular/common/http';
import customPreset from '../core/config/custom-preset';
import { NgxSpinnerModule } from 'ngx-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch()),
    provideRouter(routes),
    provideAnimations(),
    providePrimeNG({
      theme: {
        preset: customPreset,
      },
    }),
    MessageService,
    importProvidersFrom(
      ToastModule,
      NgxSpinnerModule.forRoot({ type: 'ball-pulse' })
    ),
  ],
};
