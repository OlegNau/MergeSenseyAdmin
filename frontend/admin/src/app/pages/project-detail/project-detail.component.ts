import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

// TODO: i18n

interface Pipeline {
  id: string;
  name: string;
  status?: string;
  updatedAt?: string;
}

interface Project {
  id: string;
  name: string;
  pipelines: Pipeline[];
}

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectDetailComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly location = inject(Location);

  public project = signal<Project | null>(null);
  public isWizardOpen = signal(false);

  public pipelineName = '';
  public pipelineTrigger = '';
  public pipelineAgents = '';

  constructor() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      // TODO: load project by id
      this.project.set({
        id,
        name: `Project ${id}`,
        pipelines: [],
      });
    }
  }

  public goBack(): void {
    this.location.back();
    // or this.router.navigate(['/projects']);
  }

  public openWizard(): void {
    this.isWizardOpen.set(true);
  }

  public closeWizard(): void {
    this.isWizardOpen.set(false);
  }

  public onWizardSubmit(): void {
    const data = {
      name: this.pipelineName.trim(),
      trigger: this.pipelineTrigger.trim(),
      agents: this.pipelineAgents
        .split(',')
        .map(a => a.trim())
        .filter(Boolean),
    };
    if (!data.name) {
      return;
    }
    this.createPipeline(data);
    this.closeWizard();
    this.pipelineName = this.pipelineTrigger = this.pipelineAgents = '';
  }

  private createPipeline(data: { name: string; agents: string[]; trigger: string }): void {
    // TODO: API create and local push in project.pipelines
    this.project.update(p => {
      if (!p) return p;
      return {
        ...p,
        pipelines: [...p.pipelines, { id: Date.now().toString(), name: data.name }],
      };
    });
  }

  public openPipelineDetails(pipelineId: string): void {
    this.router.navigate(['/pipeline-detail', pipelineId]);
  }
}
