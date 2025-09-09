// src/app/auth/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

export const authGuard: CanActivateChildFn = (_route, state) => {
  const oauth = inject(OAuthService);
  const router = inject(Router);

  if (oauth.hasValidAccessToken()) {
    return true;
  }
  // сохраняем целевой URL и идём на страницу логина
  sessionStorage.setItem('returnUrl', state.url || '/dashboard');
  router.navigate(['/auth/login'], { replaceUrl: true });
  return false;
};
