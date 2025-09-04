import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

type DayPoint = { date: string; success: number; failed: number; avgSec: number };
type Project = { id: string; name: string; pipelines: { id: string; name: string }[] };

@Component({
  selector: 'app-dashboard-stats',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './dashboard-stats.component.html',
  styleUrls: ['./dashboard-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardStatsComponent {
  // мок-проекты и пайплайны (заменишь из сервиса позже)
  readonly projects: Project[] = [
    { id: 'p-ai', name: 'AI Review Platform', pipelines: [{ id: 'pl-main', name: 'Main' }, { id: 'pl-sec', name: 'Security' }] },
    { id: 'p-pay', name: 'Payments',          pipelines: [{ id: 'pl-core', name: 'Core' }, { id: 'pl-recon', name: 'Reconciliation' }] },
  ];

  // мок-данные по дням (last 30d)
  readonly daysAll: DayPoint[] = [
    { date:'2025-08-06', success:10, failed:2,  avgSec:190 },
    { date:'2025-08-07', success:12, failed:1,  avgSec:210 },
    { date:'2025-08-08', success:9,  failed:3,  avgSec:205 },
    { date:'2025-08-09', success:11, failed:2,  avgSec:198 },
    { date:'2025-08-10', success:8,  failed:4,  avgSec:230 },
    { date:'2025-08-11', success:14, failed:1,  avgSec:200 },
    { date:'2025-08-12', success:13, failed:2,  avgSec:192 },
    { date:'2025-08-13', success:15, failed:1,  avgSec:188 },
    { date:'2025-08-14', success:12, failed:3,  avgSec:220 },
    { date:'2025-08-15', success:16, failed:1,  avgSec:194 },
    { date:'2025-08-16', success:17, failed:0,  avgSec:185 },
    { date:'2025-08-17', success:13, failed:3,  avgSec:210 },
    { date:'2025-08-18', success:12, failed:2,  avgSec:199 },
    { date:'2025-08-19', success:18, failed:1,  avgSec:182 },
    { date:'2025-08-20', success:16, failed:2,  avgSec:190 },
    { date:'2025-08-21', success:14, failed:3,  avgSec:202 },
    { date:'2025-08-22', success:15, failed:1,  avgSec:195 },
    { date:'2025-08-23', success:11, failed:3,  avgSec:208 },
    { date:'2025-08-24', success:13, failed:2,  avgSec:196 },
    { date:'2025-08-25', success:17, failed:1,  avgSec:184 },
    { date:'2025-08-26', success:16, failed:2,  avgSec:187 },
    { date:'2025-08-27', success:19, failed:1,  avgSec:176 },
    { date:'2025-08-28', success:18, failed:2,  avgSec:179 },
    { date:'2025-08-29', success:14, failed:3,  avgSec:203 },
    { date:'2025-08-30', success:15, failed:2,  avgSec:198 },
    { date:'2025-08-31', success:17, failed:1,  avgSec:183 },
    { date:'2025-09-01', success:20, failed:0,  avgSec:172 },
    { date:'2025-09-02', success:18, failed:1,  avgSec:175 },
    { date:'2025-09-03', success:19, failed:1,  avgSec:168 },
    { date:'2025-09-04', success:17, failed:2,  avgSec:171 },
  ];

  // фильтры
  period = signal<'7d'|'30d'|'90d'>('30d');
  projectId = signal<'all'|string>('all');
  pipelineId = signal<'all'|string>('all');

  pipelinesForSelected = computed(() => {
    const pid = this.projectId();
    if (pid === 'all') return [{ id: 'all', name: 'All pipelines' }];
    const proj = this.projects.find(p => p.id === pid);
    return [{ id: 'all', name: 'All pipelines' }, ...(proj?.pipelines ?? [])];
  });

  days = computed(() => {
    const n = this.period() === '7d' ? 7 : this.period() === '30d' ? 30 : 30; // 90d пока имитация
    return this.daysAll.slice(-n);
  });

  totals = computed(() => {
    const d = this.days();
    const runs = d.reduce((s, x) => s + x.success + x.failed, 0);
    const ok = d.reduce((s, x) => s + x.success, 0);
    const rate = runs ? Math.round((ok / runs) * 100) : 0;
    const avg = Math.round(d.reduce((s, x) => s + x.avgSec, 0) / (d.length || 1));
    return { runs, ok, rate, avg };
  });

  // sparkline path для avgSec
  sparklinePath = computed(() => this.buildSparkline(this.days().map(d => d.avgSec), 100, 32, 2));

  // утилита построения path
  private buildSparkline(values: number[], w = 100, h = 32, pad = 2): string {
    if (!values.length) return '';
    const min = Math.min(...values), max = Math.max(...values);
    const range = Math.max(1, max - min);
    const stepX = (w - pad * 2) / Math.max(1, values.length - 1);
    const y = (v: number) => h - pad - ((v - min) / range) * (h - pad * 2);

    let d = `M ${pad} ${y(values[0])}`;
    for (let i = 1; i < values.length; i++) d += ` L ${pad + i * stepX} ${y(values[i])}`;
    return d;
  }
}

