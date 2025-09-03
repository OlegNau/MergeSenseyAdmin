import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

type Run = {
  id: string;
  pipeline: string;
  project?: string;
  status: 'running' | 'success' | 'failed' | 'canceled';
  startedAt?: string;
  finishedAt?: string;
  author?: string;
};

@Component({
  selector: 'app-runs',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RunsComponent {
  private readonly router = inject(Router);
  public query = signal('');
  public status = signal<'all' | 'running' | 'success' | 'failed' | 'canceled'>('all');
  public sort = signal<'started' | 'finished' | 'status' | 'pipeline'>('started');

  public runs = signal<Run[]>([
    // TODO: mock; replace with API
  ]);

  public filtered = computed(() => {
    let list = this.runs();
    const q = this.query().toLowerCase();
    if (q) {
      list = list.filter(r =>
        r.id.toLowerCase().includes(q) ||
        r.pipeline.toLowerCase().includes(q) ||
        r.project?.toLowerCase().includes(q)
      );
    }
    const st = this.status();
    if (st !== 'all') {
      list = list.filter(r => r.status === st);
    }
    const sort = this.sort();
    return [...list].sort((a, b) => {
      switch (sort) {
        case 'finished':
          return compareDateDesc(a.finishedAt, b.finishedAt);
        case 'status':
          return a.status.localeCompare(b.status);
        case 'pipeline':
          return a.pipeline.localeCompare(b.pipeline);
        default:
          return compareDateDesc(a.startedAt, b.startedAt);
      }
    });
  });

  public trackById = (_: number, r: Run) => r.id;

  public openRun(id: string): void {
    this.router.navigate(['runs', id]);
  }

  public openPipeline(nameOrId: string): void {
    this.router.navigate(['pipeline-detail', nameOrId]);
  }

  public openProject(nameOrId: string): void {
    this.router.navigate(['project-detail', nameOrId]);
  }

  public rerun(id: string): void {
    // TODO: trigger re-run
  }

  public cancel(id: string): void {
    // TODO: cancel run
  }
}

function compareDateDesc(a?: string, b?: string) {
  const ad = a ? Date.parse(a) : 0;
  const bd = b ? Date.parse(b) : 0;
  return bd - ad;
}

