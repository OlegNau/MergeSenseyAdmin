import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

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
  id = this.route.snapshot.paramMap.get('id') || '0';

  pipeline = {
    id: this.id,
    name: 'Main Pipeline (main branch)',
    status: 'Active',
    project: 'AI Review Platform',
    trigger: 'push to main',
    lastRun: '2024-01-15T14:30:00Z',
    stats: { successRate: 92, avgDurationSec: 204, totalRuns: 247 },
    overview: { trigger: 'push to main', status: 'Active', agents: 45 },
  };

  tab: 'overview' | 'history' | 'agents' | 'settings' = 'overview';

  history = [
    { date: '2024-01-15T14:30:00Z', status: 'Success', duration: 180, ref: 'abc123' },
    { date: '2024-01-14T13:00:00Z', status: 'Failed', duration: 210, ref: 'def456' },
    { date: '2024-01-13T10:15:00Z', status: 'Success', duration: 200, ref: 'ghi789' },
  ];

  agents = [
    { name: 'Static Analysis', active: true },
    { name: 'Security Scan', active: true },
    { name: 'Lint/Format', active: false },
  ];

  setTab(t: 'overview' | 'history' | 'agents' | 'settings') {
    this.tab = t;
  }

  run() {
    console.log('RUN', this.pipeline.id);
  }

  saveSettings(name: string, trigger: string, branch: string) {
    console.log('SAVE', { name, trigger, branch });
  }
}
