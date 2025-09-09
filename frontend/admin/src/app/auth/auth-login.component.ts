import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  standalone: true,
  selector: 'app-auth-login',
  imports: [CommonModule],
  templateUrl: './auth-login.component.html',
})
export class AuthLoginComponent {
  // важно: public, чтобы темплейт видел поле (раньше была ошибка про private route)
  public route = inject(ActivatedRoute);
  private router = inject(Router);
  private oauth = inject(OAuthService);

  isBusy = false;

  async ngOnInit() {
    // если уже авторизованы — уходим сразу на returnUrl/дешборд
    if (this.oauth.hasValidAccessToken()) {
      const returnUrl = sessionStorage.getItem('returnUrl') ?? '/dashboard';
      sessionStorage.removeItem('returnUrl');
      await this.router.navigateByUrl(returnUrl, { replaceUrl: true });
      return;
    }

    // на всякий случай: не держим кнопку выключенной
    this.isBusy = false;
  }

  async login() {
    try {
      this.isBusy = true;

      // Аккуратно готовим returnUrl (не оставляем /auth/login)
      const currentUrl = this.router.url.split('?')[0];
      const qpReturn = this.route.snapshot.queryParamMap.get('returnUrl');
      const returnUrl = qpReturn && qpReturn !== '/auth/login'
        ? qpReturn
        : (currentUrl !== '/auth/login' ? currentUrl : '/dashboard');

      sessionStorage.setItem('returnUrl', returnUrl);

      // Стартуем OIDC Code Flow (редирект на IdP)
      this.oauth.initLoginFlow();
      // дальше управление уйдёт на /connect/authorize, кнопку возвращать не нужно
    } catch (e) {
      console.error('Login error', e);
      this.isBusy = false; // вернём кнопку в рабочее состояние при локальной ошибке
    }
  }
}
