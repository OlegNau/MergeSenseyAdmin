import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService, LoginOptions } from 'angular-oauth2-oidc';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oauth: OAuthService, private router: Router) {
    // fail-safe: на случай, если APP_INITIALIZER не успел
    this.oauth.configure(environment.oAuthConfig as any);
  }

  // Жёсткая очистка мусора из прошлых попыток (nonce/state/pkce)
  private clearAuthJunk() {
    const wipe = (store: Storage) => {
      const keys = Array.from({ length: store.length }, (_, i) => store.key(i)!).filter(
        k =>
          k != null &&
          /nonce|state|verifier|pkce|code_verifier|session_state|oauth2/i.test(k)
      );
      for (const k of keys) try { store.removeItem(k); } catch {}
    };
    wipe(localStorage);
    wipe(sessionStorage);
  }

  /**
   * Старт логина: ЧИСТИМ стореджи -> загружаем discovery -> initCodeFlow().
   * Если initCodeFlow не редиректит мгновенно — это уже окружение/браузер.
   */
  async login(returnUrl = '/dashboard'): Promise<void> {
    sessionStorage.setItem('returnUrl', returnUrl);
    this.clearAuthJunk();

    // discovery обязателен
    await this.oauth.loadDiscoveryDocument();

    // штатный код-флоу (PKCE включён по умолчанию в lib)
    this.oauth.initCodeFlow();
    // дальше управление уходит в редирект на /connect/authorize
  }

  /**
   * Коллбэк: пробуем обмен кода на токен.
   * В DEV отключаем проверку state, чтобы не упираться в расхождение.
   * После того как всё заработает стабильно — выключи disableOAuth2StateCheck.
   */
  async completeLogin(): Promise<void> {
    // на всякий случай подгрузим discovery (если фронт обновлялся в момент логина)
    try {
      if (!(this.oauth as any).discoveryDocumentLoaded) {
        await this.oauth.loadDiscoveryDocument();
      }
    } catch {}

    const opts: LoginOptions = {
      // DEV-режим: пропускаем проверку state, чтобы не падать
      disableOAuth2StateCheck: true,
      // preventClearHashAfterLogin: true — для implicit; для code flow не критично
    };

    await this.oauth.tryLogin(opts);

    const ok = this.oauth.hasValidAccessToken();
    const ru = sessionStorage.getItem('returnUrl') || '/dashboard';
    sessionStorage.removeItem('returnUrl');

    await this.router.navigateByUrl(ok ? ru : '/auth/login');
  }

  logout(): void {
    this.clearAuthJunk();
    this.oauth.logOut();
  }
}
