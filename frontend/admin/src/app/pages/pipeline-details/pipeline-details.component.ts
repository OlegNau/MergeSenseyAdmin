import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pipeline-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pipeline-details.component.html',
  styleUrls: ['./pipeline-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipelineDetailsComponent {}
