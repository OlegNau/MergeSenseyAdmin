import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

export const authGuard: CanActivateChildFn = async (_route, state) => {
  const oauth = inject(OAuthService);
  const router = inject(Router);

  const search = new URLSearchParams(window.location.search);
  const hasCode = search.has('code') && search.has('state');

  if (hasCode) {
    try {
      // ✅ Гарантируем discovery ДО обмена code→tokens
      await oauth.loadDiscoveryDocument();
      await oauth.tryLoginCodeFlow();

      // после входа — чистим query (в т.ч. iss/culture/ui-culture) и остаёмся на том же пути
      const cleanUrl = state.url.split('?')[0] || '/dashboard';
      await router.navigateByUrl(cleanUrl, { replaceUrl: true });
    } catch (e) {
      // если вдруг exchange не удался — отправляем на логин
      console.error('tryLoginCodeFlow failed', e);
      sessionStorage.setItem('returnUrl', state.url || '/dashboard');
      return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
    }
  }

  if (oauth.hasValidAccessToken()) {
    return true;
  }

  // Не авторизован — ведём на публичный логин, запоминая, куда возвращаться
  sessionStorage.setItem('returnUrl', state.url || '/dashboard');
  return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
};
