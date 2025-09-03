import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

// TODO: i18n, API

type Run = {
  id: string;
  startedAt?: string;
  finishedAt?: string;
  status: 'running' | 'success' | 'failed' | 'canceled';
  author?: string;
};

@Component({
  selector: 'app-pipeline-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './pipeline-detail.component.html',
  styleUrls: ['./pipeline-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipelineDetailComponent {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly location = inject(Location);

  pipeline = signal<{
    id: string;
    name: string;
    project?: string;
    trigger?: string;
    status: 'idle' | 'running' | 'disabled';
    agents?: string[];
  } | null>(null);

  runs = signal<Run[]>([]);
  query = signal<string>('');
  filteredRuns = computed(() => {
    const q = this.query().toLowerCase();
    return this.runs().filter(r =>
      r.id.toLowerCase().includes(q) ||
      r.status.toLowerCase().includes(q) ||
      (r.author?.toLowerCase().includes(q) ?? false)
    );
  });
  isStopping = signal<boolean>(false);
  isStarting = signal<boolean>(false);

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // TODO: load pipeline + runs from API using id
      this.pipeline.set({
        id,
        name: `Pipeline ${id}`,
        project: 'Demo Project',
        trigger: 'manual',
        status: 'idle',
        agents: ['agent-1', 'agent-2'],
      });
      this.runs.set([
        { id: '101', status: 'success', startedAt: '2024-05-01', finishedAt: '2024-05-01', author: 'Alice' },
        { id: '102', status: 'failed', startedAt: '2024-05-02', finishedAt: '2024-05-02', author: 'Bob' },
        { id: '103', status: 'running', startedAt: '2024-05-03', author: 'Carol' },
      ]);
    }
  }

  goBack() {
    this.location.back();
    // or this.router.navigate(['/projects']);
  }

  startPipeline() {
    if (this.isStarting() || this.pipeline()?.status === 'running') return;
    this.isStarting.set(true);
    setTimeout(() => {
      this.pipeline.update(p => (p ? { ...p, status: 'running' } : p));
      this.isStarting.set(false);
    }, 1000);
  }

  stopPipeline() {
    if (this.isStopping() || this.pipeline()?.status !== 'running') return;
    this.isStopping.set(true);
    setTimeout(() => {
      this.pipeline.update(p => (p ? { ...p, status: 'idle' } : p));
      this.isStopping.set(false);
    }, 1000);
  }

  openRunDetails(id: string) {
    this.router.navigate(['/runs', id]);
  }
}

