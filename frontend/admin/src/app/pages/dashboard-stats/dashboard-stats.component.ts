import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardStatsComponent {
  private readonly router = inject(Router);
  // Filters
  public range = signal<'7d' | '30d' | '90d' | 'custom'>('7d');
  public from = signal<string | null>(null);
  public to = signal<string | null>(null);
  public query = signal<string>('');

  public readonly presetRanges = ['7d', '30d', '90d'] as const;

  // KPI
  public kpis = signal([
    { id: 'runs',        label: 'Runs',        value: 0, delta: +0 },
    { id: 'successRate', label: 'Success %',   value: 0, delta: +0 },
    { id: 'mttr',        label: 'MTTR (min)',  value: 0, delta: -0 },
    { id: 'failures',    label: 'Failures',    value: 0, delta: +0 },
  ]);

  // Time series and lists
  public timeseries = signal<{ date: string; runs: number; success: number; failed: number }[]>([]);
  public topPipelines = signal<{ id: string; name: string; runs: number; successRate: number }[]>([]);
  public topProjects = signal<{ id: string; name: string; runs: number; successRate: number }[]>([]);
  public recentFailures = signal<{ id: string; pipeline: string; when: string; reason?: string }[]>([]);

  // Computed values
  public filteredSeries = computed(() => {
    const data = this.timeseries();
    const range = this.range();
    const from = this.from();
    const to = this.to();

    let start: Date;
    let end: Date;

    if (range === 'custom' && from && to) {
      start = new Date(from);
      end = new Date(to);
    } else {
      const days = range === '7d' ? 7 : range === '30d' ? 30 : 90;
      end = new Date();
      start = new Date();
      start.setDate(end.getDate() - days + 1);
    }

    return data.filter(d => {
      const date = new Date(d.date);
      return date >= start && date <= end;
    });
  });

  public filteredPipelines = computed(() => {
    const q = this.query().toLowerCase();
    return this.topPipelines()
      .filter(p => !q || p.name.toLowerCase().includes(q))
      .sort((a, b) => b.runs - a.runs);
  });

  public filteredProjects = computed(() => {
    const q = this.query().toLowerCase();
    return this.topProjects()
      .filter(p => !q || p.name.toLowerCase().includes(q))
      .sort((a, b) => b.runs - a.runs);
  });

  // Navigation
  public setRange(opt: '7d' | '30d' | '90d' | 'custom'): void {
    this.range.set(opt);
  }

  public openPipeline(id: string): void {
    this.router.navigate(['/pipelines', id]);
  }

  public openProject(id: string): void {
    this.router.navigate(['/projects', id]);
  }

  // TODO: load real data from API; recalc KPIs on range change; i18n
  // TODO: integrate charts
}
