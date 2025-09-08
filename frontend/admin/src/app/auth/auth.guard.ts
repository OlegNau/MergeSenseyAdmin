import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

async function handle(stateUrl: string): Promise<boolean> {
  const oauth = inject(OAuthService);
  const router = inject(Router);
  const url = new URL(window.location.href);

  if (url.searchParams.has('error')) {
    sessionStorage.removeItem('auth.loginInProgress');
    await router.navigate(['/auth/login'], {
      queryParams: {
        error: url.searchParams.get('error') ?? 'unknown_error',
        error_description: url.searchParams.get('error_description') ?? '',
      },
      replaceUrl: true,
    });
    return false;
  }

  if (url.searchParams.has('code') && url.searchParams.has('state')) {
    try {
      await oauth.tryLoginCodeFlow();
    } finally {
      sessionStorage.removeItem('auth.loginInProgress');
    }

    const ru = sessionStorage.getItem('returnUrl') || stateUrl || '/dashboard';
    sessionStorage.removeItem('returnUrl');
    await router.navigateByUrl(ru, { replaceUrl: true });
    return true;
  }

  if (oauth.hasValidAccessToken()) {
    return true;
  }

  if (sessionStorage.getItem('auth.loginInProgress') === '1') {
    return false;
  }
  sessionStorage.setItem('auth.loginInProgress', '1');

  try {
    if (!(oauth as any).discoveryDocumentLoaded) {
      await oauth.loadDiscoveryDocument();
    }
  } catch {}

  oauth.initCodeFlow();
  return false;
}

export const authGuard: CanActivateChildFn = async (route, state) => handle(state.url);
export const authGuardActivate: CanActivateFn = async (route, state) => handle(state.url);

