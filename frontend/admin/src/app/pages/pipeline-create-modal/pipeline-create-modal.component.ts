import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-pipeline-create-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './pipeline-create-modal.component.html',
  styleUrls: ['./pipeline-create-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipelineCreateModalComponent {
  private readonly fb = inject(FormBuilder);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  step: 1 | 2 | 3 | 4 = 1;
  projectId = this.route.snapshot.paramMap.get('projectId') || '';

  readonly form = this.fb.nonNullable.group({
    name: this.fb.nonNullable.control('', {
      validators: [Validators.required, Validators.minLength(3)],
    }),
    trigger: this.fb.nonNullable.control<'manual' | 'push' | 'schedule'>('manual'),
    branch: this.fb.nonNullable.control('main'),
    schedule: this.fb.nonNullable.group({
      type: this.fb.nonNullable.control<'daily' | 'weekly' | 'cron'>('daily'),
      cron: this.fb.control<string>(''),
    }),
    agents: this.fb.nonNullable.array<FormControl<boolean>>([]),
    notes: this.fb.control<string>(''),
  });

  readonly agentDefs = [
    { key: 'static', label: 'Static Analysis' },
    { key: 'security', label: 'Security Scan' },
    { key: 'lint', label: 'Lint & Format' },
  ];

  get agentsArray(): FormArray<FormControl<boolean>> {
    return this.form.controls.agents;
  }

  get trigger(): 'manual' | 'push' | 'schedule' {
    return this.form.controls.trigger.value;
  }

  selectedAgents(): string[] {
    return this.agentDefs
      .filter((_, i) => this.agentsArray.at(i).value)
      .map(a => a.label);
  }

  constructor() {
    this.agentDefs.forEach(() => this.agentsArray.push(this.fb.nonNullable.control(false)));
  }

  next() {
    if (this.step === 1 && this.form.controls.name.invalid) {
      this.form.controls.name.markAsTouched();
      return;
    }
    if (
      this.step === 2 &&
      this.trigger === 'schedule' &&
      this.form.controls.schedule.controls.type.value === 'cron' &&
      !this.form.controls.schedule.controls.cron.value
    ) {
      return;
    }
    this.step = Math.min(4, this.step + 1);
  }

  canNext(step: number): boolean {
    if (step === 1) {
      return this.form.controls.name.valid;
    }
    if (step === 2) {
      if (
        this.trigger === 'schedule' &&
        this.form.controls.schedule.controls.type.value === 'cron'
      ) {
        return !!this.form.controls.schedule.controls.cron.value;
      }
      return true;
    }
    return true;
  }

  prev() {
    if (this.step > 1) {
      this.step--;
    }
  }

  close() {
    this.router.navigate([{ outlets: { modal: null } }]);
  }

  create() {
    const payload = this.form.getRawValue();
    console.log('CREATE PIPELINE', payload);
    this.close();
    if (this.projectId) {
      this.router.navigate(['/projects', this.projectId]);
    }
  }
}
