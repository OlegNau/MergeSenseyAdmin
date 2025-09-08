import { bootstrapApplication } from '@angular/platform-browser';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withRouterConfig,
} from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { provideAbpCore, withOptions } from '@abp/ng.core';
import { provideAbpOAuth } from '@abp/ng.oauth';

import { provideOAuthClient, OAuthStorage, OAuthService } from 'angular-oauth2-oidc';
import { APP_INITIALIZER, inject } from '@angular/core';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
    ),
    provideHttpClient(withInterceptorsFromDi()),

    provideOAuthClient({
      resourceServer: {
        allowedUrls: ['https://localhost:44396'],
        sendAccessToken: true,
      },
    }),

    { provide: OAuthStorage, useValue: localStorage },

    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: () => {
        const oauth = inject(OAuthService);
        return async () => {
          oauth.setStorage(localStorage);
          oauth.configure(environment.oAuthConfig as any);

          // 👇 Диагностика
          try {
            oauth.events.subscribe((e) => {
              console.log('[oauth-event]', e.type, e);
            });
          } catch {}

          try {
            await oauth.loadDiscoveryDocument();
          } catch {}
        };
      },
    },

    provideAbpCore(
      withOptions({
        environment,
        registerLocaleFn: (locale: string) => {
          const loaders: Record<string, () => Promise<unknown>> = {
            ru: () => import('@angular/common/locales/ru'),
            en: () => import('@angular/common/locales/en'),
            de: () => import('@angular/common/locales/de'),
            fr: () => import('@angular/common/locales/fr'),
          };
          const key = (locale || 'en').toLowerCase();
          const load = loaders[key] ?? loaders['en'];
          return load().then((m) => (m as any).default ?? m);
        },
      }),
    ),
    provideAbpOAuth(),
  ],
}).catch((err) => console.error(err));
