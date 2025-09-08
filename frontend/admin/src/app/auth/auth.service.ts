import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OAuthService, OAuthEvent } from 'angular-oauth2-oidc';
import { filter, Observable } from 'rxjs';
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
    // Гарантируем, что discovery загружен — иначе initCodeFlow может «молча» не сработать
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
}
