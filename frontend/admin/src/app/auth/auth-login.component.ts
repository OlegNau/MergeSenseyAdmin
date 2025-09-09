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
  // ВАЖНО: делаем публичным, если где-то всё ещё используешь в шаблоне
  public route = inject(ActivatedRoute);

  // Публичные поля для отображения ошибок из query params
  public error: string | null = null;
  public errorDescription: string | null = null;

  async ngOnInit() {
    // Считаем ошибки (если IdP вернул ошибку)
    this.error = this.route.snapshot.queryParamMap.get('error');
    this.errorDescription = this.route.snapshot.queryParamMap.get('error_description');

    // Если уже авторизованы — сразу уходим на returnUrl
    if (this.oauth.hasValidAccessToken()) {
      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
      await this.router.navigateByUrl(returnUrl, { replaceUrl: true });
    }
  }

  login() {
    // Сохраняем желаемый маршрут и стартуем code flow
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
    sessionStorage.setItem('returnUrl', returnUrl);
    this.oauth.initCodeFlow();
  }
}
