import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation, withRouterConfig } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER, inject } from '@angular/core';
import { OAuthService, OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc';
import { provideAbpCore, withOptions } from '@abp/ng.core';
import { provideAbpOAuth } from '@abp/ng.oauth';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';
import { Router } from '@angular/router';

/** Лениво регистрируем локали для ABP */
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

/** Простой bootstrap OIDC: discovery + tryLogin — и навигируем на returnUrl, если он был */
function authInitializer() {
  return async () => {
    const oauth = inject(OAuthService);
    const router = inject(Router);
    const cfg = environment.oAuthConfig!;

    oauth.configure({
      issuer: cfg.issuer, // со слешом — как в discovery
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

    // discovery + обмен code→tokens + очистка URL
    await oauth.loadDiscoveryDocumentAndTryLogin();

    // Вернём пользователя туда, куда он шёл перед логином (если есть токен)
    const returnUrl = sessionStorage.getItem('returnUrl');
    if (returnUrl && oauth.hasValidAccessToken()) {
      sessionStorage.removeItem('returnUrl');
      await router.navigateByUrl(returnUrl, { replaceUrl: true });
    }

    // Silent refresh, если сервер поддерживает
    try { oauth.setupAutomaticSilentRefresh(); } catch {}
  };
}

// Разрешённые адреса API, чтобы HttpClient прикреплял Authorization: Bearer
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
