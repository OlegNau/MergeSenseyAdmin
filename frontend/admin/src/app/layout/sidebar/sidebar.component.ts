import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export type SidebarItem = {
  id: string;
  label: string;
  to: string;
  icon: 'dashboard' | 'projects' | 'pipelines' | 'runs' | 'stats' | 'settings' | 'help';
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  @Input() logoSrc = 'assets/logo.png';
  @Input() items: SidebarItem[] = [];
}

