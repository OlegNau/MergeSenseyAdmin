import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthEvent, OAuthService } from 'angular-oauth2-oidc';
import { Observable, filter } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly oauth = inject(OAuthService);
  private readonly router = inject(Router);

  constructor() {
    // fail-safe: если APP_INITIALIZER не успел
    this.oauth.configure(environment.oAuthConfig as any);
  }

  async login(returnUrl = '/dashboard'): Promise<void> {
    sessionStorage.setItem('returnUrl', returnUrl);

    // Гарантируем загрузку discovery-документа
    try {
      if (!(this.oauth as any).discoveryDocumentLoaded) {
        await this.oauth.loadDiscoveryDocument();
      }
    } catch (e) {
      console.error('Discovery не загрузился. Бэк жив на https://localhost:44396?', e);
      alert('Сервер авторизации недоступен (https://localhost:44396). Запусти бэк/проверь сертификат.');
      return;
    }

    this.oauth.initCodeFlow();

    // Angular иногда "проглатывает" redirect, выполняем PKCE вручную
    setTimeout(() => this.manualPkceRedirect(), 300);
  }

  private async manualPkceRedirect(): Promise<void> {
    if (!location.pathname.startsWith('/auth/login')) return;

    const verifier = this.randomString(64);
    const challenge = await this.pkceChallenge(verifier);
    const nonce = this.randomString(32);
    const state = this.randomString(32);

    localStorage.setItem('PKCE_verifier', verifier);
    localStorage.setItem('nonce', nonce);
    localStorage.setItem('state', state);

    const cfg = environment.oAuthConfig as any;
    const params = new URLSearchParams({
      response_type: 'code',
      client_id: cfg.clientId,
      redirect_uri: cfg.redirectUri,
      scope: cfg.scope,
      code_challenge: challenge,
      code_challenge_method: 'S256',
      nonce,
      state,
    });

    location.href = `${cfg.issuer}connect/authorize?${params.toString()}`;
  }

  async completeLogin(): Promise<boolean> {
    try {
      if (!(this.oauth as any).discoveryDocumentLoaded) {
        await this.oauth.loadDiscoveryDocument();
      }
    } catch {}

    await this.oauth.tryLoginCodeFlow();
    const ok = this.oauth.hasValidAccessToken();
    const ru = sessionStorage.getItem('returnUrl') || '/dashboard';
    sessionStorage.removeItem('returnUrl');
    await this.router.navigateByUrl(ok ? ru : '/auth/login');
    return ok;
  }

  logout(): void {
    this.oauth.logOut();
  }

  hasToken(): boolean {
    return this.oauth.hasValidAccessToken();
  }

  events$(): Observable<OAuthEvent> {
    return this.oauth.events.pipe(filter(Boolean));
  }

  private randomString(length: number): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, b => ('0' + (b % 36).toString(36)).slice(-1)).join('');
  }

  private async pkceChallenge(verifier: string): Promise<string> {
    const data = new TextEncoder().encode(verifier);
    const digest = await crypto.subtle.digest('SHA-256', data);
    return this.base64Url(new Uint8Array(digest));
  }

  private base64Url(bytes: Uint8Array): string {
    let str = btoa(String.fromCharCode(...Array.from(bytes)));
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
}
