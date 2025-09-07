import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PipelineService } from '../../proxy/pipelines/pipeline.service';
import type { PipelineDto } from '../../proxy/pipelines/dtos/models';

type Status = 'Active' | 'Inactive';
type PipelineRow = { id: string; name: string; project: string; status: Status; trigger: string; lastRun: string };

@Component({
  selector: 'app-all-pipelines',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './all-pipelines.component.html',
  styleUrls: ['./all-pipelines.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllPipelinesComponent {
  readonly rows = signal<PipelineRow[]>([]);
  readonly loading = signal(true);

  public search = '';
  public projectFilter = 'All';
  public moreOpen = false;
  public statusFilter = new Set<Status>();

  public projects: string[] = ['All'];

  constructor(private pipelines: PipelineService) {
    this.pipelines.getList({ skipCount: 0, maxResultCount: 100, sorting: '' })
      .subscribe({
        next: res => {
          const mapped = (res.items ?? []).map((x: PipelineDto) => ({
            id: x.id || '',
            name: x.name ?? '',
            project: x.projectId ?? '',
            status: (x.status === 'Active' ? 'Active' : 'Inactive') as Status,
            trigger: x.trigger ?? '',
            lastRun: x.lastRun ?? x.finishedAt ?? x.startedAt ?? '',
          }));
          this.rows.set(mapped);
          const names = Array.from(new Set(mapped.map(m => m.project).filter(p => p)));
          this.projects = ['All', ...names];
        },
        error: () => {
          this.rows.set([]);
          this.projects = ['All'];
        },
        complete: () => this.loading.set(false),
      });
  }

  public filtered(): PipelineRow[] {
    const q = this.search.trim().toLowerCase();
    return this.rows().filter(r => {
      if (this.projectFilter !== 'All' && r.project !== this.projectFilter) return false;
      if (this.statusFilter.size && !this.statusFilter.has(r.status)) return false;
      if (!q) return true;
      return r.name.toLowerCase().includes(q) || r.project.toLowerCase().includes(q);
    });
  }

  public toggleStatus(s: Status): void {
    this.statusFilter.has(s) ? this.statusFilter.delete(s) : this.statusFilter.add(s);
  }
}
