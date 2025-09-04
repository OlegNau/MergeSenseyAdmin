import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppHeaderComponent } from './header/header.component';

type NavItem = {
  id: string;
  label: string;
  to: string;
  icon:
    | 'dashboard'
    | 'projects'
    | 'pipelines'
    | 'stats'
    | 'settings'
    | 'help';
};
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, NgOptimizedImage, AppHeaderComponent],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent {
  public sidebarOpen = false;

  public toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  readonly nav: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', to: '/dashboard', icon: 'dashboard' },
    { id: 'projects', label: 'Projects', to: '/projects', icon: 'projects' },
    { id: 'pipelines', label: 'Pipelines', to: '/all-pipelines', icon: 'pipelines' },
    { id: 'stats', label: 'Stats', to: '/dashboard-stats', icon: 'stats' },
  ];

  readonly secondary: NavItem[] = [
    { id: 'settings', label: 'Settings', to: '/settings', icon: 'settings' },
    { id: 'help', label: 'Help', to: '/help', icon: 'help' },
  ];
}
