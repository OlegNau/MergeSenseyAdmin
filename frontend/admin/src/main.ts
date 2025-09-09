import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation, withRouterConfig } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, inject } from '@angular/core';
import { Router } from '@angular/router';

import { registerLocaleData } from '@angular/common';
import { OAuthService, OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc';
import { provideAbpCore, withOptions } from '@abp/ng.core';
import { provideAbpOAuth } from '@abp/ng.oauth';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

/** Robust, explicit locale loader (works with ru/en/de/fr) */
const registerLocaleFn = (locale: string) => {
  const key = (locale || 'en').split('-')[0].toLowerCase();
  const loaders: Record<string, () => Promise<any>> = {
    ru: () => import('@angular/common/locales/ru'),
    en: () => import('@angular/common/locales/en'),
    de: () => import('@angular/common/locales/de'),
    fr: () => import('@angular/common/locales/fr'),
  };
  const load = loaders[key] ?? loaders['en'];
  return load().then((m) => {
    const data = (m as any).default ?? m;
    registerLocaleData(data);
    return data;
  });
};

/** OIDC bootstrap: discovery + tryLogin + cleanup + returnUrl */
function authInitializer() {
  return async () => {
    const oauth = inject(OAuthService);
    const router = inject(Router);
    const cfg = environment.oAuthConfig!;

    oauth.configure({
      issuer: cfg.issuer, // must match discovery (with trailing /)
      redirectUri: cfg.redirectUri,
      postLogoutRedirectUri: cfg.postLogoutRedirectUri,
      clientId: cfg.clientId,
      responseType: cfg.responseType, // 'code'
      scope: cfg.scope, // 'openid profile offline_access AICodeReview'
      requireHttps: cfg.requireHttps,
      strictDiscoveryDocumentValidation: cfg.strictDiscoveryDocumentValidation,
      showDebugInformation: cfg.showDebugInformation,
      sessionChecksEnabled: cfg.sessionChecksEnabled,
      clearHashAfterLogin: true,
    });

    oauth.setStorage(localStorage as unknown as OAuthStorage);

    // discovery + code->tokens
    await oauth.loadDiscoveryDocumentAndTryLogin().catch(() => {});

    // включаем silent refresh (если поддерживается)
    try { oauth.setupAutomaticSilentRefresh(); } catch {}

    // чистим мусорные query-параметры ABP, чтобы не было циклов/чёрного экрана
    const url = new URL(window.location.href);
    if (url.searchParams.has('iss') || url.searchParams.has('culture') || url.searchParams.has('ui-culture')) {
      await router.navigateByUrl(router.url.split('?')[0], { replaceUrl: true });
    }

    // если логин удался — уходим на сохранённый returnUrl
    if (oauth.hasValidAccessToken()) {
      const returnUrl = sessionStorage.getItem('returnUrl');
      if (returnUrl) {
        sessionStorage.removeItem('returnUrl');
        await router.navigateByUrl(returnUrl, { replaceUrl: true });
      }
    }
  };
}

// Build allowedUrls for attaching Authorization: Bearer
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
    provideAbpCore(withOptions({
      environment,
      registerLocaleFn,
    })),
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
