import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Project {
  id: string;
  name: string;
  description: string;
  provider: 'GitHub' | 'GitLab' | 'Bitbucket';
  repoPath: string;
  branch: string;
  active: number;
  total: number;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  public readonly projects = signal<Project[]>([
    {
      id: '1',
      name: 'Design System',
      description: 'Reusable UI components',
      provider: 'GitHub',
      repoPath: 'acme/design-system',
      branch: 'main',
      active: 2,
      total: 5,
    },
    {
      id: '2',
      name: 'API Server',
      description: 'NestJS backend service',
      provider: 'GitLab',
      repoPath: 'acme/api-server',
      branch: 'develop',
      active: 1,
      total: 3,
    },
    {
      id: '3',
      name: 'Mobile App',
      description: 'Cross-platform client',
      provider: 'Bitbucket',
      repoPath: 'acme/mobile-app',
      branch: 'main',
      active: 0,
      total: 2,
    },
    {
      id: '4',
      name: 'Web Client',
      description: 'Angular frontend',
      provider: 'GitHub',
      repoPath: 'acme/web-client',
      branch: 'main',
      active: 4,
      total: 7,
    },
  ]);

}
