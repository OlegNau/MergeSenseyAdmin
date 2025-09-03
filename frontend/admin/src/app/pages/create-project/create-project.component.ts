import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProjectComponent {
  // TODO: i18n
  private fb = inject(FormBuilder);
  private router = inject(Router);

  readonly form = this.fb.group({
    name: ['', Validators.required],
    description: [''],
    repository: [''],
    defaultBranch: [''],
    visibility: ['private'],
  });

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    // TODO: API call and navigation to project detail page
  }

  cancel(): void {
    this.router.navigate(['/projects']);
  }
}
