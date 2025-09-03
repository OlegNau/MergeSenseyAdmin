import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  step: 1 | 2 | 3 | 4 = 1;
  projectId = this.route.snapshot.paramMap.get('projectId') || '';

  agentOptions = ['Static Analysis', 'Security Scan', 'Lint/Format'];

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    trigger: this.fb.control<'manual' | 'push' | 'schedule'>('manual'),
    branch: this.fb.control('main'),
    schedule: this.fb.group({
      type: this.fb.control<'daily' | 'weekly' | 'cron'>('daily'),
      cron: [''],
    }),
    agents: this.fb.array(this.agentOptions.map(() => this.fb.control(false))),
    rule: [''],
  });

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {}

  get agentsArray(): FormArray {
    return this.form.get('agents') as FormArray;
  }

  selectedAgents(): string[] {
    return this.agentOptions.filter((_, i) => this.agentsArray.at(i).value);
  }

  next() {
    if (this.step < 4) {
      this.step++;
    }
  }

  prev() {
    if (this.step > 1) {
      this.step--;
    }
  }

  close() {
    this.router.navigate([{ outlets: { modal: null } }]);
  }

  canNext(step: number): boolean {
    if (step === 1) {
      return this.form.get('name')!.valid;
    }
    if (step === 2) {
      if (this.form.value.trigger === 'schedule' && this.form.value.schedule?.type === 'cron') {
        return !!this.form.value.schedule?.cron?.trim();
      }
      return true;
    }
    return true;
  }

  create() {
    const payload = this.form.value;
    console.log('CREATE PIPELINE', payload);
    this.close();
    if (this.projectId) {
      this.router.navigate(['/projects', this.projectId]);
    }
  }
}
