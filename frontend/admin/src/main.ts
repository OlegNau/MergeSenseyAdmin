import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, withEnabledBlockingInitialNavigation, withRouterConfig } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { APP_INITIALIZER } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { OAuthService, OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc';
import { provideAbpCore, withOptions } from '@abp/ng.core';
import { provideAbpOAuth } from '@abp/ng.oauth';

import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { environment } from './environments/environment';

/** Регистрация локалей (ru/en/de/fr) для Angular i18n */
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

/** Лёгкий bootstrap для загрузки discovery ДО первого роутинга */
function authInitializer(oauth: OAuthService) {
  return async () => {
    const cfg = environment.oAuthConfig!;
    oauth.configure({
      issuer: cfg.issuer,
      redirectUri: cfg.redirectUri,
      postLogoutRedirectUri: cfg.postLogoutRedirectUri,
      clientId: cfg.clientId,
      responseType: cfg.responseType,         // 'code'
      scope: cfg.scope,                       // с offline_access
      requireHttps: cfg.requireHttps,
      strictDiscoveryDocumentValidation: cfg.strictDiscoveryDocumentValidation,
      showDebugInformation: cfg.showDebugInformation,
      sessionChecksEnabled: cfg.sessionChecksEnabled,
      clearHashAfterLogin: true,
      useSilentRefresh: false,                // для code+refresh не нужен iframe
    });
    oauth.setStorage(localStorage as unknown as OAuthStorage);
    await oauth.loadDiscoveryDocument();      // чтобы гард видел tokenEndpoint
    oauth.setupAutomaticSilentRefresh();      // авто-рефреш по таймеру событиям
  };
}

const API = environment.apis.default.url.replace(/\/+$/, '');
const ALLOWED_URLS = [API, `${API}/`];

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),                 // ждём инициализаторы до первого перехода
      withRouterConfig({ paramsInheritanceStrategy: 'always' }),
    ),
    provideHttpClient(withInterceptorsFromDi()),
    provideAbpCore(withOptions({
      environment,
      registerLocaleFn,                                       // ABP съест culture/ui-culture сам
    })),
    provideAbpOAuth(),
    provideOAuthClient({
      resourceServer: {
        allowedUrls: ALLOWED_URLS,
        sendAccessToken: true,
      },
    }),
    { provide: APP_INITIALIZER, useFactory: authInitializer, deps: [OAuthService], multi: true },
  ],
}).catch(console.error);
