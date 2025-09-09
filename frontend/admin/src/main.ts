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
      responseType: cfg.responseType,
      scope: cfg.scope,
      requireHttps: cfg.requireHttps,
      strictDiscoveryDocumentValidation: cfg.strictDiscoveryDocumentValidation,
      showDebugInformation: cfg.showDebugInformation,
      sessionChecksEnabled: cfg.sessionChecksEnabled,
      clearHashAfterLogin: true,
    });

    oauth.setStorage(localStorage as unknown as OAuthStorage);

    // 1) Discovery
    await oauth.loadDiscoveryDocument();

    // 2) Пробуем обменять code, если он есть
    const loggedIn = await oauth.tryLoginCodeFlow({
      onTokenReceived: info => {
        // опционально — лог
        // console.log('token received', info);
      }
    });

    // 3) Если уже залогинены — вернуть на returnUrl
    const returnUrl = sessionStorage.getItem('returnUrl');
    if (oauth.hasValidAccessToken()) {
      if (returnUrl) {
        sessionStorage.removeItem('returnUrl');
        await router.navigateByUrl(returnUrl, { replaceUrl: true });
      }
      return;
    }

    // 4) Если code не пришёл и токена нет — просто продолжаем.
    // Страница логина инициирует интерактивный вход вручную (initCodeFlow()).
  };
}

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
    provideAbpCore(withOptions({ environment })),
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
