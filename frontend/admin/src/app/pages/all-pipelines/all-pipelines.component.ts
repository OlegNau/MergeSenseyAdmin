import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-all-pipelines',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './all-pipelines.component.html',
  styleUrls: ['./all-pipelines.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllPipelinesComponent {}
