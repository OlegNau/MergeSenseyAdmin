import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  standalone: true,
  selector: 'app-auth-login',
  imports: [CommonModule],
  templateUrl: './auth-login.component.html',
})
export class AuthLoginComponent {
  private readonly oauth = inject(OAuthService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  loading = false;
  error = this.route.snapshot.queryParamMap.get('error') ?? '';

  async login() {
    this.loading = true;
    try {
      const ret = this.route.snapshot.queryParamMap.get('returnUrl');
      const pathOnly = ret ? ret.split('?')[0] : '/dashboard';
      sessionStorage.setItem('returnUrl', pathOnly);
      this.oauth.initCodeFlow();
    } finally {
      this.loading = false;
    }
  }
}
