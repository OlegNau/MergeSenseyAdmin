import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

function stripQuery(url: string) {
  const q = url.indexOf('?');
  return q >= 0 ? url.slice(0, q) : url;
}

export const authGuard: CanActivateChildFn = async (_route, state) => {
  const oauth = inject(OAuthService);
  const router = inject(Router);

  // Возврат с code/state → обмен на токены и очистка query
  const qp = new URLSearchParams(window.location.search);
  const hasCode = qp.has('code') && qp.has('state');

  if (hasCode) {
    try {
      await oauth.tryLoginCodeFlow();
      const cleanUrl = stripQuery(state.url);
      await router.navigateByUrl(cleanUrl, { replaceUrl: true } as any);
      return true;
    } catch (e) {
      console.error('tryLoginCodeFlow failed', e);
      const cleanUrl = stripQuery(state.url || '/dashboard');
      return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: cleanUrl } });
    }
  }

  if (oauth.hasValidAccessToken()) {
    return true;
  }

  const cleanUrl = stripQuery(state.url || '/dashboard');
  sessionStorage.setItem('returnUrl', cleanUrl);
  return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: cleanUrl } });
};
