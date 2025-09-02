import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pipeline-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './pipeline-detail.component.html',
  styleUrls: ['./pipeline-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PipelineDetailComponent {}
