import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

async function handle(stateUrl: string): Promise<boolean> {
  const oauth = inject(OAuthService);
  const router = inject(Router);

  if (stateUrl.startsWith('/auth/')) return true;

  if (oauth.hasValidAccessToken()) return true;

  sessionStorage.setItem('returnUrl', stateUrl);

  if (!sessionStorage.getItem('auth.loginInProgress')) {
    sessionStorage.setItem('auth.loginInProgress', '1');
    oauth.initCodeFlow();
  }

  return false;
}

export const authGuardActivate: CanActivateFn = async (_r, s) => handle(s.url);
export const authGuard: CanActivateChildFn = async (_r, s) => handle(s.url);

