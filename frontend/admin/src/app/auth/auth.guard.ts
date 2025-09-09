import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

function toLogin(url: string) {
  const router = inject(Router);
  return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: url } });
}

async function handle(stateUrl: string): Promise<boolean | ReturnType<typeof toLogin>> {
  const oauth = inject(OAuthService);

  if (stateUrl.startsWith('/auth/')) return true;
  if (oauth.hasValidAccessToken()) return true;

  return toLogin(stateUrl);
}

export const authGuardActivate: CanActivateFn = async (_r, s) => handle(s.url);
export const authGuard: CanActivateChildFn = async (_r, s) => handle(s.url);
