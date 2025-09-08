import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { OAuthService, LoginOptions } from 'angular-oauth2-oidc';

async function handle(stateUrl: string): Promise<boolean> {
  const oauth = inject(OAuthService);
  const router = inject(Router);
  const url = new URL(window.location.href);

  if (url.searchParams.has('error')) {
    console.warn('[auth] OIDC error:', url.searchParams.get('error'), url.searchParams.get('error_description'));
    await router.navigate(['/']);
    return false;
  }

  if (url.searchParams.has('code') && url.searchParams.has('state')) {
    try {
      const opts: LoginOptions = { disableOAuth2StateCheck: false };
      await oauth.tryLoginCodeFlow(opts);

      if (!oauth.hasValidAccessToken()) {
        console.warn('[auth] tryLoginCodeFlow finished but access token invalid');
        await router.navigate(['/']);
        return false;
      }

      const ru = sessionStorage.getItem('returnUrl') || '/dashboard';
      sessionStorage.removeItem('returnUrl');

      await router.navigateByUrl(ru);
      return false;
    } catch (e) {
      console.error('[auth] tryLoginCodeFlow failed', e);
      await router.navigate(['/']);
      return false;
    }
  }

  if (oauth.hasValidAccessToken()) return true;
  // ✅ NEW: если мы уже стоим на том же URL, который собираемся сохранить как returnUrl,
  // просто кинем на логин сразу (без лишних «сохранений» и гонок навигации)
  const currentUrl = router.routerState.snapshot.url || '/';
  const plannedUrl = stateUrl || '/';
  if (currentUrl === plannedUrl) {
    oauth.initCodeFlow();
    return false;
  }

  sessionStorage.setItem('returnUrl', plannedUrl);
  try {
    if (!(oauth as any).discoveryDocumentLoaded) {
      await oauth.loadDiscoveryDocument();
    }
  } catch (e) {
    console.warn('[auth] discovery load failed, continuing with initCodeFlow', e);
  }
  oauth.initCodeFlow();
  return false;
}

export const authGuard: CanActivateChildFn = async (route, state) => handle(state.url);
export const authGuardActivate: CanActivateFn = async (route, state) => handle(state.url);

