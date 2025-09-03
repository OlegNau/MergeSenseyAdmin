import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

interface ProjectVm {
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
  private readonly router = inject(Router);

  projects = signal<ProjectVm[]>([
    {
      id: '1',
      name: 'Alpha Project',
      description: 'First project description',
      provider: 'GitHub',
      repoPath: 'org/alpha',
      branch: 'main',
      active: 3,
      total: 10,
    },
    {
      id: '2',
      name: 'Beta Project',
      description: 'Second project description',
      provider: 'GitLab',
      repoPath: 'team/beta',
      branch: 'develop',
      active: 1,
      total: 5,
    },
    {
      id: '3',
      name: 'Gamma Project',
      description: 'Third project description',
      provider: 'Bitbucket',
      repoPath: 'acme/gamma',
      branch: 'main',
      active: 0,
      total: 2,
    },
    {
      id: '4',
      name: 'Delta Project',
      description: 'Fourth project description',
      provider: 'GitHub',
      repoPath: 'org/delta',
      branch: 'release',
      active: 4,
      total: 12,
    },
  ]);

  createProject() {
    this.router.navigate(['/create-project']);
  }

}
