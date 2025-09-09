import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipelineApi, PipelineDto } from '../../shared/api/pipeline.api';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  private api = inject(PipelineApi);
  loading = signal(true);
  pipelines = signal<PipelineDto[]>([]);

  constructor() {
    this.api.getAll().subscribe({
      next: (items) => { this.pipelines.set(items); this.loading.set(false); },
      error: () => { this.pipelines.set([]); this.loading.set(false); },
    });
  }

  get totalPipelines() { return this.pipelines().length; }
}
