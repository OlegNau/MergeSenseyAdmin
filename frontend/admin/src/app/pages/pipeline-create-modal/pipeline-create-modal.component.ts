import { ChangeDetectionStrategy, Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';

type Trigger = 'manual'|'push'|'schedule';
type SchType = 'daily'|'weekly'|'cron';

@Component({
  selector: 'app-pipeline-create-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './pipeline-create-modal.component.html',
  styleUrls: ['./pipeline-create-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipelineCreateModalComponent {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  step = 1;
  readonly projectId = this.route.snapshot.paramMap.get('projectId')!;

  readonly form = this.fb.nonNullable.group({
    name: this.fb.nonNullable.control('', { validators: [Validators.required, Validators.minLength(3)] }),
    trigger: this.fb.nonNullable.control<Trigger>('manual'),
    branch: this.fb.nonNullable.control('main'),
    schedule: this.fb.nonNullable.group({
      type: this.fb.nonNullable.control<SchType>('daily'),
      cron: this.fb.control<string>(''),
    }),
    agents: this.fb.nonNullable.array<FormControl<boolean>>([]),
    notes: this.fb.control<string>(''),
  });

  readonly agentDefs = [
    { key: 'static',   label: 'Static Analysis' },
    { key: 'security', label: 'Security Scan'  },
    { key: 'lint',     label: 'Lint & Format'  },
  ];

  get agentsArray(): FormArray<FormControl<boolean>> { return this.form.controls.agents; }
  get trigger(): Trigger { return this.form.controls.trigger.value; }

  constructor() {
    this.agentDefs.forEach(() => this.agentsArray.push(this.fb.nonNullable.control(false)));
  }

  @HostListener('document:keydown.escape') onEsc() { this.close(); }

  close() { this.router.navigate([{ outlets: { modal: null } }]); }
  prev()  { this.step = Math.max(1, this.step - 1); }
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
  submit() {
    if (this.step !== 4) return;
    const payload = this.form.getRawValue();
    console.log('CREATE PIPELINE', { projectId: this.projectId, ...payload });
    this.close();
  }
}
