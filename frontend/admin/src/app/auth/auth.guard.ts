import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

export const authGuard: CanActivateChildFn = async (_route, state) => {
  const oauth = inject(OAuthService);
  const router = inject(Router);

  // Если возвращаемся с code/state — завершаем вход ЗДЕСЬ
  const qp = new URLSearchParams(window.location.search);
  const hasCode = qp.has('code') && qp.has('state');

  if (hasCode) {
    try {
      await oauth.tryLoginCodeFlow();
      // чистим query, оставляем путь, чтобы не ходить кругами
      await router.navigateByUrl(state.url.split('?')[0], { replaceUrl: true });
    } catch (e) {
      console.error('tryLoginCodeFlow failed', e);
    }
  }

  if (oauth.hasValidAccessToken()) {
    return true;
  }

  // Не авторизован → ведём на публичную страницу логина
  sessionStorage.setItem('returnUrl', state.url);
  return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } });
};
