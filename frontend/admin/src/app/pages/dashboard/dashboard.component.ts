import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private readonly router = inject(Router);

  summary = signal([
    { label: 'Projects', value: 0 },
    { label: 'Pipelines', value: 0 },
    { label: 'Runs', value: 0 },
    { label: 'Failures', value: 0 },
  ]);

  quick = signal([
    { id: 'new-project', label: 'New Project', icon: 'plus', to: '/create-project' },
    { id: 'pipelines', label: 'Pipelines', icon: 'pipeline', to: '/all-pipelines' },
  ]);

  recentRuns = signal<
    { id: string; pipeline: string; status: 'success' | 'failed' | 'running'; when: string }[]
  >([]);
  recentProjects = signal<
    { id: string; name: string; updatedAt?: string }[]
  >([]);

  query = signal('');
  filteredRuns = computed(() => {
    const q = this.query().toLowerCase();
    return this.recentRuns().filter(r =>
      !q || r.id.includes(q) || r.pipeline.toLowerCase().includes(q)
    );
  });

  go(to: string) {
    this.router.navigateByUrl(to);
  }

  openProject(id: string) {
    this.router.navigate(['project-detail', id]);
  }

  openRun(id: string) {
    // TODO: /runs/:id
    this.router.navigate(['/runs', id]);
  }

  // TODO: load data from API
  // TODO: i18n
}
