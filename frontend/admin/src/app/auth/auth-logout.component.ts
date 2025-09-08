import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth-logout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-logout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLogoutComponent {
  private readonly auth = inject(AuthService);
  ngOnInit() { this.auth.logout(); }
}
