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

function authInitializer() {
  return async () => {
    const oauth = inject(OAuthService);
    const cfg = environment.oAuthConfig!;

    oauth.configure({
      issuer: cfg.issuer,
      redirectUri: cfg.redirectUri,
      postLogoutRedirectUri: cfg.postLogoutRedirectUri,
      clientId: cfg.clientId,
      responseType: cfg.responseType,
      scope: cfg.scope,
      requireHttps: cfg.requireHttps,
      strictDiscoveryDocumentValidation: cfg.strictDiscoveryDocumentValidation,
      showDebugInformation: cfg.showDebugInformation,
      sessionChecksEnabled: cfg.sessionChecksEnabled,
      clearHashAfterLogin: true,
      timeoutFactor: 0.75,
    });

    oauth.setStorage(localStorage as unknown as OAuthStorage);

    await oauth.loadDiscoveryDocumentAndTryLogin();
    oauth.setupAutomaticSilentRefresh();

    if (oauth.hasValidAccessToken()) {
      sessionStorage.removeItem('auth.loginInProgress');
    }

    const returnUrl = sessionStorage.getItem('returnUrl');
    if (returnUrl && oauth.hasValidAccessToken()) {
      sessionStorage.removeItem('returnUrl');
      history.replaceState(history.state, document.title, returnUrl);
    }
  };
}

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes, withEnabledBlockingInitialNavigation(), withRouterConfig({ paramsInheritanceStrategy: 'always' })),
    provideHttpClient(withInterceptorsFromDi()),
    provideAbpCore(withOptions({ environment, registerLocaleFn })),
    provideAbpOAuth(),
    provideOAuthClient(),
    { provide: APP_INITIALIZER, useFactory: authInitializer, multi: true },
  ],
}).catch(console.error);

