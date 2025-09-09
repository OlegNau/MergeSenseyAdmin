import { Component, ChangeDetectionStrategy, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  standalone: true,
  selector: 'app-auth-login',
  imports: [CommonModule],
  templateUrl: './auth-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginComponent implements OnInit {
  private oauth = inject(OAuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  async ngOnInit() {
    // Если уже авторизованы (возврат с IdP) — уходим на returnUrl
    if (this.oauth.hasValidAccessToken()) {
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
      await this.router.navigateByUrl(returnUrl, { replaceUrl: true });
    }
  }

  login() {
    this.oauth.initCodeFlow();
  }
}
