import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CookieService } from 'ngx-cookie-service';
import { provideToastr } from 'ngx-toastr';
import { setHeaderInterceptor } from './core/interceptors/set-header.interceptor';
import { globErrMsgInterceptor } from './core/interceptors/glob-err-msg.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { globLoadingInterceptor } from './core/interceptors/glob-loading.interceptor';
import {
  provideTranslateService,
  provideTranslateLoader,
} from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([setHeaderInterceptor, globLoadingInterceptor])
    ),
    provideAnimations(),
    NgxSpinnerModule,
    provideToastr(),
    importProvidersFrom([CookieService]),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json',
      }),
      fallbackLang: 'en',
      lang: 'en',
    }),
  ],
};
