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

  project = signal<Project | null>(null);
  isWizardOpen = signal(false);

  pipelineName = '';
  pipelineTrigger = '';
  pipelineAgents = '';

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

  goBack() {
    this.location.back();
    // or this.router.navigate(['/projects']);
  }

  openWizard() {
    this.isWizardOpen.set(true);
  }

  closeWizard() {
    this.isWizardOpen.set(false);
  }

  onWizardSubmit() {
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

  createPipeline(data: { name: string; agents: string[]; trigger: string }) {
    // TODO: API create and local push in project.pipelines
    this.project.update(p => {
      if (!p) return p;
      return {
        ...p,
        pipelines: [...p.pipelines, { id: Date.now().toString(), name: data.name }],
      };
    });
  }

  openPipelineDetails(pipelineId: string) {
    this.router.navigate(['/pipeline-detail', pipelineId]);
  }
}
