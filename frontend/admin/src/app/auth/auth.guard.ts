import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

export const authGuard: CanActivateFn = (route, state) => {
  const oauth = inject(OAuthService);
  const router = inject(Router);

  if (oauth.hasValidAccessToken()) return true;

  router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  return false;
};
