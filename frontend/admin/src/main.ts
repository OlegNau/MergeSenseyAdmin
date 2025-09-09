import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation, withRouterConfig } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, inject } from '@angular/core';
import { OAuthService, OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc';
import { provideAbpCore, withOptions } from '@abp/ng.core';
import { provideAbpOAuth } from '@abp/ng.oauth';
import { Router } from '@angular/router';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

// Локали для ABP
const registerLocaleFn = (locale: string) => {
  const loaders: Record<string, () => Promise<unknown>> = {
    ru: () => import('@angular/common/locales/ru'),
    en: () => import('@angular/common/locales/en'),
    de: () => import('@angular/common/locales/de'),
    fr: () => import('@angular/common/locales/fr'),
  };
  const key = (locale || 'en').toLowerCase();
  const load = loaders[key] ?? loaders['en'];
  return load().then((m) => (m as any).default ?? m);
};

// Жёсткая последовательность: discovery → tryLoginCodeFlow (если есть code/state) → silent refresh → возврат на returnUrl
function authInitializer() {
  return async () => {
    const oauth = inject(OAuthService);
    const router = inject(Router);
    const cfg = environment.oAuthConfig!;

    oauth.configure({
      issuer: cfg.issuer,
      redirectUri: cfg.redirectUri,
      postLogoutRedirectUri: cfg.postLogoutRedirectUri,
      clientId: cfg.clientId,
      responseType: cfg.responseType, // 'code'
      scope: cfg.scope,
      requireHttps: cfg.requireHttps,
      strictDiscoveryDocumentValidation: cfg.strictDiscoveryDocumentValidation,
      showDebugInformation: cfg.showDebugInformation,
      sessionChecksEnabled: cfg.sessionChecksEnabled,
      clearHashAfterLogin: true,
    });

    oauth.setStorage(localStorage as unknown as OAuthStorage);

    // 1) Скачиваем discovery
    await oauth.loadDiscoveryDocument();

    // 2) Если IdP вернул error — покажем его на /auth/login и очистим URL
    const url = new URL(window.location.href);
    if (url.searchParams.has('error')) {
      const err = url.searchParams.get('error') ?? '';
      const ed = url.searchParams.get('error_description') ?? '';
      history.replaceState(history.state, document.title, cfg.redirectUri);
      await router.navigate(['/auth/login'], { queryParams: { error: err, error_description: ed }, replaceUrl: true });
      return;
    }

    // 3) Обмен кода на токены, если есть code/state в URL
    if (url.searchParams.has('code') && url.searchParams.has('state')) {
      try {
        await oauth.tryLoginCodeFlow();
      } finally {
        // очищаем query params
        history.replaceState(history.state, document.title, cfg.redirectUri);
      }
    }

    // 4) Возврат на сохранённый returnUrl, если токен валиден
    if (oauth.hasValidAccessToken()) {
      const ru = sessionStorage.getItem('returnUrl');
      if (ru) {
        sessionStorage.removeItem('returnUrl');
        await router.navigateByUrl(ru, { replaceUrl: true });
      }
    }

    // 5) Silent refresh (если сервер поддерживает)
    try { oauth.setupAutomaticSilentRefresh(); } catch {}
  };
}

// Для прикрепления Authorization: Bearer к API
const API = environment.apis.default.url.replace(/\/+$/, '');
const ALLOWED_URLS = [API, `${API}/`];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideAbpCore(withOptions({ environment, registerLocaleFn })),
    provideAbpOAuth(),
    provideOAuthClient({
      resourceServer: {
        allowedUrls: ALLOWED_URLS,
        sendAccessToken: true,
      },
    }),
    { provide: APP_INITIALIZER, useFactory: authInitializer, multi: true },
  ],
}).catch(console.error);
