import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../proxy/projects/project.service';
import type { ProjectDto } from '../../proxy/projects/dtos/models';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsComponent {
  readonly loading = signal(true);
  readonly projects = signal<Array<{
    id: string; name: string; description: string;
    provider: 'GitHub'|'GitLab'|'Bitbucket';
    repoPath: string; branch: string; active: number; total: number;
  }>>([]);

  constructor(private projectService: ProjectService) {
    this.projectService.getList({ skipCount: 0, maxResultCount: 50, sorting: '' })
      .subscribe({
        next: res => {
          const mapped = (res.items ?? []).map((x: ProjectDto) => ({
            id: x.id || '',
            name: x.name ?? '',
            description: x.description ?? '',
            provider: 'GitHub' as const,
            repoPath: '',
            branch: 'main',
            active: 0,
            total: 0,
          }));
          this.projects.set(mapped);
        },
        error: () => this.projects.set([]),
        complete: () => this.loading.set(false),
      });
  }
}
