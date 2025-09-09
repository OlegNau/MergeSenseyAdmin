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
  public route = inject(ActivatedRoute);

  async ngOnInit() {
    if (this.oauth.hasValidAccessToken()) {
      const ru = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
      await this.router.navigateByUrl(ru, { replaceUrl: true });
    }
  }

  login() {
    const ru = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
    sessionStorage.setItem('returnUrl', ru);
    this.oauth.initCodeFlow();
  }
}
