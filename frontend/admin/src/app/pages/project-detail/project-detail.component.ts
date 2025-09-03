import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';

type Status = 'Active' | 'Inactive';
type PipelineRow = { id: string; name: string; status: Status; lastRun: string };

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent {
  private route = inject(ActivatedRoute);
  readonly id = this.route.snapshot.paramMap.get('id') ?? 'unknown';

  // мок-данные (замени на сервис)
  readonly project = {
    id: this.id,
    name: this.id === 'ai-review' ? 'AI Review Platform' : 'Project ' + this.id,
    description:
      'Core company product for automated code reviews with machine learning capabilities',
    pipelines: <PipelineRow[]>[
      { id: 'p-main', name: 'Main Pipeline (main branch)', status: 'Active', lastRun: '2024-01-15T14:30:00Z' },
      { id: 'p-log', name: 'Log Analysis (staging)', status: 'Inactive', lastRun: '2024-01-14T11:00:00Z' },
      { id: 'p-perf', name: 'Performance Testing', status: 'Active', lastRun: '2024-01-15T09:15:00Z' },
    ],
  };
}

