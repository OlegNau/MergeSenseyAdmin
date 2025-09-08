import { Injectable, inject } from '@angular/core';
import { OAuthService, OAuthEvent } from 'angular-oauth2-oidc';
import { filter, map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly oauth = inject(OAuthService);

  initOnce(): Promise<void> {
    // no-op here; ABP providers already bootstrapped OAuth. Keep method if needed later.
    return Promise.resolve();
  }

  login(): void {
    this.oauth.initCodeFlow(); // redirect to /connect/authorize (server login page)
  }

  async completeLogin(): Promise<boolean> {
    await this.oauth.loadDiscoveryDocument(); // idempotent
    await this.oauth.tryLoginCodeFlow();
    return this.oauth.hasValidAccessToken();
  }

  logout(): void {
    this.oauth.logOut(); // server-side logout if endsession supported
  }

  hasToken(): boolean {
    return this.oauth.hasValidAccessToken();
  }

  accessToken(): string | null {
    return this.oauth.getAccessToken() || null;
  }

  claims(): any {
    return this.oauth.getIdentityClaims() || null;
  }

  userName(): string {
    const c: any = this.claims();
    return c?.name || c?.preferred_username || '';
  }

  events$(): Observable<OAuthEvent> {
    return this.oauth.events.pipe(filter(e => !!e));
  }
}
