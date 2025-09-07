import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ProjectService } from '../../proxy/projects/project.service';
import { PipelineService } from '../../proxy/pipelines/pipeline.service';
import type { ProjectDto } from '../../proxy/projects/dtos/models';
import type { PipelineDto } from '../../proxy/pipelines/dtos/models';

type PipelineRow = { id: string; name: string; status: 'Active'|'Inactive'; lastRun: string };

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly projects = inject(ProjectService);
  private readonly pipelines = inject(PipelineService);

  readonly loading = signal(true);
  project: { id: string; name: string; description: string; pipelines: PipelineRow[] } = {
    id: '',
    name: '',
    description: '',
    pipelines: [],
  };

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.projects.get(id).subscribe({
      next: (p: ProjectDto) => {
        this.project.id = p.id || '';
        this.project.name = p.name ?? '';
        this.project.description = p.description ?? '';
      },
      error: () => {
        this.project = { id: '', name: '', description: '', pipelines: [] };
      },
    });
    this.pipelines.getList({ projectId: id, skipCount: 0, maxResultCount: 50, sorting: '' })
      .subscribe({
        next: res => {
          const mapped = (res.items ?? []).map((x: PipelineDto) => ({
            id: x.id || '',
            name: x.name ?? '',
            status: (x.status === 'Active' ? 'Active' : 'Inactive') as 'Active'|'Inactive',
            lastRun: x.lastRun ?? x.finishedAt ?? x.startedAt ?? '',
          }));
          this.project.pipelines = mapped;
        },
        error: () => { this.project.pipelines = []; },
        complete: () => this.loading.set(false),
      });
  }

  openCreatePipelineModal(projectId: string) {
    this.router.navigate([{ outlets: { modal: ['projects', projectId, 'pipelines', 'new'] } }], { relativeTo: this.route.root });
  }
}
