import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

type Trigger = 'manual'|'push'|'schedule';

@Component({
  selector: 'app-pipeline-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './pipeline-create.component.html',
  styleUrls: ['./pipeline-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PipelineCreateComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  readonly projectId = this.route.snapshot.paramMap.get('projectId')!;

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    trigger: ['manual' as Trigger, Validators.required],
    branch: ['main'],
    schedule: this.fb.group({
      type: ['daily'],  // daily | weekly | cron
      cron: [''],
    }),
    variables: this.fb.array([]), // будущие K/V пары
    description: [''],
  });

  is(t: Trigger) { return this.form.get('trigger')?.value === t; }

  cancel() { this.router.navigate(['/projects', this.projectId]); }
  submit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const payload = { projectId: this.projectId, ...this.form.value };
    console.log('CREATE PIPELINE', payload);
    this.router.navigate(['/projects', this.projectId]);
  }
}
