import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginComponent {
  private readonly auth = inject(AuthService);
  private readonly route = inject(ActivatedRoute);
  async onLogin() {
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
    await this.auth.login(returnUrl);
  }
}
