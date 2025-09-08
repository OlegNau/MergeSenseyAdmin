import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { OAuthService, LoginOptions } from 'angular-oauth2-oidc';

async function handle(stateUrl: string): Promise<boolean> {
  const oauth = inject(OAuthService);
  const router = inject(Router);
  const url = new URL(window.location.href);

  // 1) If we came back from the IdP with code/state — finish login
  if (url.searchParams.has('code') && url.searchParams.has('state')) {
    try {
      const opts: LoginOptions = { disableOAuth2StateCheck: false };
      await oauth.tryLoginCodeFlow(opts);

      const ru = sessionStorage.getItem('returnUrl') || '/dashboard';
      sessionStorage.removeItem('returnUrl');

      // Cleanup query string and continue
      await router.navigateByUrl(ru);
      return false; // abort current navigation; we navigated manually
    } catch {
      await router.navigate(['/auth/login'], { queryParams: { returnUrl: stateUrl } });
      return false;
    }
  }

  // 2) Already have a valid access token? Allow
  if (oauth.hasValidAccessToken()) return true;

  // 3) No token — start login
  sessionStorage.setItem('returnUrl', stateUrl);
  try {
    if (!(oauth as any).discoveryDocumentLoaded) {
      await oauth.loadDiscoveryDocument();
    }
  } catch {}
  oauth.initCodeFlow(); // redirect to /connect/authorize
  return false;
}

export const authGuard: CanActivateChildFn = async (route, state) => handle(state.url);
export const authGuardActivate: CanActivateFn = async (route, state) => handle(state.url);
