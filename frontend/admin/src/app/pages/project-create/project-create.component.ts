import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

type Provider = 'github'|'gitlab'|'bitbucket';

@Component({
  selector: 'app-project-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectCreateComponent {
  step = 1;
  provider: Provider | null = null;

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    repo: this.fb.group({
      url: [''],
      branch: ['main'],
      token: [''],
    }),
  });

  get repoGroup(): FormGroup {
    return this.form.get('repo') as FormGroup;
  }

  setProvider(p: Provider) { this.provider = p; }
  canContinue1() { return this.form.get('name')!.valid && this.form.get('description')!.valid; }
  canContinue2() {
    if (!this.provider) return false;
    // URL/token опциональны — подключение можно сделать позже
    return true;
  }

  next(){ if (this.step === 1 && this.canContinue1()) this.step = 2; else if (this.step === 2 && this.canContinue2()) this.step = 3; }
  back(){ if (this.step > 1) this.step--; else this.router.navigateByUrl('/projects'); }

  submit(){
    if (this.step !== 3) return;
    const payload = {
      name: this.form.value.name,
      description: this.form.value.description,
      provider: this.provider,
      repository: this.form.value.repo,
    };
    // TODO: заменить на реальный сервис создания
    console.log('CREATE PROJECT', payload);
    this.router.navigateByUrl('/projects');
  }
}
