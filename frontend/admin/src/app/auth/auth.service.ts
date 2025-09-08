import { Injectable } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private oauth: OAuthService) {}

  login(returnUrl = '/dashboard') {
    sessionStorage.setItem('returnUrl', returnUrl);
    this.oauth.initCodeFlow();
  }

  logout() {
    this.oauth.logOut(); // clear tokens and redirect to redirectUri
  }

  isAuthenticated(): boolean {
    return this.oauth.hasValidAccessToken();
  }
}

