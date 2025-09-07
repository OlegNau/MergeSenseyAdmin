import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PipelineService } from '../../proxy/pipelines/pipeline.service';
import type { PipelineDto } from '../../proxy/pipelines/dtos/models';

@Component({
  selector: 'app-pipeline-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './pipeline-detail.component.html',
  styleUrls: ['./pipeline-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipelineDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly pipelines = inject(PipelineService);

  pipeline: (PipelineDto & {
    project?: string;
    stats: { successRate: number; avgDurationSec: number; totalRuns: number };
    overview: { trigger: string; status: string; agents: number };
  }) = {
    id: '',
    name: '',
    project: '',
    status: '',
    trigger: '',
    lastRun: '',
    stats: { successRate: 0, avgDurationSec: 0, totalRuns: 0 },
    overview: { trigger: '', status: '', agents: 0 },
  };
  tab: 'overview'|'history'|'agents'|'settings' = 'overview';

  history: Array<{ date: string; status: string; duration: number; ref: string }> = [];
  agents: Array<{ name: string; active: boolean }> = [];

  constructor() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.pipelines.get(id).subscribe({
      next: p => {
        this.pipeline = {
          ...this.pipeline,
          ...p,
          project: p.projectId ?? '',
          trigger: p.trigger ?? '',
          status: p.status ?? '',
          lastRun: p.lastRun ?? p.finishedAt ?? p.startedAt ?? '',
        };
      },
      error: () => {},
    });
  }

  setTab(t: 'overview'|'history'|'agents'|'settings') { this.tab = t; }

  run() {
    const id = this.pipeline.id || '';
    if (!id) return;
    this.pipelines.run(id).subscribe();
  }

  saveSettings(name: string, trigger: string, branch: string) {
    const id = this.pipeline.id || '';
    if (!id) return;
    this.pipelines.update(id, { name, trigger }).subscribe();
  }
}
