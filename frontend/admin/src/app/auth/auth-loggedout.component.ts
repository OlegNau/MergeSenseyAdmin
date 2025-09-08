import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-loggedout',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './auth-loggedout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoggedOutComponent {}
