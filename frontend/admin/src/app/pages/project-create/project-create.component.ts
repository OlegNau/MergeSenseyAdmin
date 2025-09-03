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
  public step = 1;
  public provider: Provider | null = null;

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

  public readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    repo: this.fb.group({
      url: [''],
      branch: ['main'],
      token: [''],
    }),
  });

  public get repoGroup(): FormGroup {
    return this.form.get('repo') as FormGroup;
  }

  public setProvider(p: Provider): void { this.provider = p; }
  public canContinue1(): boolean { return this.form.get('name')!.valid && this.form.get('description')!.valid; }
  public canContinue2(): boolean {
    if (!this.provider) return false;
    // URL/token опциональны — подключение можно сделать позже
    return true;
  }

  public next(): void { if (this.step === 1 && this.canContinue1()) this.step = 2; else if (this.step === 2 && this.canContinue2()) this.step = 3; }
  public back(): void { if (this.step > 1) this.step--; else this.router.navigateByUrl('/projects'); }

  public submit(): void {
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
