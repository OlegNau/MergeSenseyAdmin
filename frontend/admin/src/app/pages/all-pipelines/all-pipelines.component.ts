import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

type Pipeline = {
  id: string;
  name: string;
  project?: string;
  status?: 'idle' | 'running' | 'failed' | 'success';
  updatedAt?: string;
};

@Component({
  selector: 'app-all-pipelines',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './all-pipelines.component.html',
  styleUrls: ['./all-pipelines.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllPipelinesComponent {
  private readonly router = inject(Router);

  query = signal('');
  status = signal<'all' | 'idle' | 'running' | 'failed' | 'success'>('all');
  sort = signal<'updated' | 'name'>('updated');

  pipelines = signal<Pipeline[]>([
    // TODO: mock data; replace with API
    { id: '1', name: 'Build API', project: 'Alpha', status: 'running', updatedAt: '2024-06-01' },
    { id: '2', name: 'Deploy Web', project: 'Beta', status: 'failed', updatedAt: '2024-05-30' },
    { id: '3', name: 'Test Suite', project: 'Alpha', status: 'success', updatedAt: '2024-05-28' },
    { id: '4', name: 'Analytics Data', project: 'Gamma', status: 'idle', updatedAt: '2024-05-27' },
  ]);
  // TODO: load pipelines from API

  filtered = computed(() => {
    let list = this.pipelines();
    const q = this.query().toLowerCase();
    if (q) {
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) || p.project?.toLowerCase().includes(q)
      );
    }
    const status = this.status();
    if (status !== 'all') {
      list = list.filter(p => p.status === status);
    }
    const sort = this.sort();
    return [...list].sort((a, b) => {
      if (sort === 'name') {
        return a.name.localeCompare(b.name);
      }
      return (b.updatedAt || '').localeCompare(a.updatedAt || '');
    });
  });

  trackById = (_: number, p: Pipeline) => p.id;

  runPipeline(id: string) {
    // TODO: trigger run
    console.log('run pipeline', id);
  }

  openPipeline(id: string) {
    this.router.navigate(['/pipeline-detail', id]);
  }

  openProject(projectNameOrId: string) {
    this.router.navigate(['/project-detail', projectNameOrId]);
  }

  // TODO: i18n
}
