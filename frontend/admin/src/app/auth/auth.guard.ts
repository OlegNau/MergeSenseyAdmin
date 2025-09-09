import { inject } from '@angular/core';
import { CanActivateChildFn, CanActivateFn, Router } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

function toLogin(url: string) {
  const router = inject(Router);
  return router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: url } });
}

async function handle(stateUrl: string): Promise<boolean | ReturnType<typeof toLogin>> {
  const oauth = inject(OAuthService);

  // Публичные роуты не защищаем
  if (stateUrl.startsWith('/auth/')) return true;

  // Есть валидный access token — пропускаем
  if (oauth.hasValidAccessToken()) return true;

  // Нет токена — ведём на страницу логина (кнопка инициирует интерактивный логин)
  return toLogin(stateUrl);
}

export const authGuardActivate: CanActivateFn = async (_r, s) => handle(s.url);
export const authGuard: CanActivateChildFn = async (_r, s) => handle(s.url);
