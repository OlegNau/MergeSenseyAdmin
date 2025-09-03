import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

type NavItem = { id:string; label:string; to:string; icon:'home'|'folder'|'activity'|'settings'|'help'|'stats'|'runs' };
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayoutComponent {
  sidebarOpen = signal(false);
  toggleSidebar() { this.sidebarOpen.update(v => !v); }
  closeSidebar() { this.sidebarOpen.set(false); }

  nav: NavItem[] = [
    { id:'dashboard', label:'Dashboard', to:'/dashboard', icon:'home' },
    { id:'projects',  label:'Projects',  to:'/projects',  icon:'folder' },
    { id:'pipelines', label:'Pipelines', to:'/all-pipelines', icon:'activity' },
    { id:'runs',      label:'Runs',      to:'/runs',      icon:'runs' },
    { id:'stats',     label:'Stats',     to:'/dashboard-stats', icon:'stats' },
  ];
  secondary: NavItem[] = [
    { id:'settings', label:'Settings', to:'/settings', icon:'settings' },
    { id:'help',     label:'Help',     to:'/help',     icon:'help' },
  ];
}
