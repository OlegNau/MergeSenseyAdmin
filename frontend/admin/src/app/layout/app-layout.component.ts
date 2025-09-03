import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppHeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';

type NavItem = {
  id: string;
  label: string;
  to: string;
  icon:
    | 'dashboard'
    | 'projects'
    | 'pipelines'
    | 'runs'
    | 'stats'
    | 'settings'
    | 'help';
};
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, AppHeaderComponent, SidebarComponent],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent {
  sidebarOpen = signal(false);

  toggleSidebar() {
    this.sidebarOpen.update((v) => !v);
  }

  nav: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', to: '/dashboard', icon: 'dashboard' },
    { id: 'projects', label: 'Projects', to: '/projects', icon: 'projects' },
    { id: 'pipelines', label: 'Pipelines', to: '/all-pipelines', icon: 'pipelines' },
    { id: 'runs', label: 'Runs', to: '/runs', icon: 'runs' },
    { id: 'stats', label: 'Stats', to: '/dashboard-stats', icon: 'stats' },
    { id: 'settings', label: 'Settings', to: '/settings', icon: 'settings' },
    { id: 'help', label: 'Help', to: '/help', icon: 'help' },
  ];
}
