import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

type Tab = 'company'|'team'|'security'|'notifications'|'language';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  public active: Tab = 'company';
  private readonly fb = inject(FormBuilder);
  public readonly form = this.fb.group({
    companyName: ['Acme Corporation', [Validators.required]],
    website: ['https://acme.com', [Validators.required, Validators.pattern(/^https?:\/\/.+$/)]],
    description: ['Leading technology company focused on innovative solutions.'],
  });
  public setTab(t: Tab): void{ this.active = t; }
  public is(t: Tab): boolean{ return this.active === t; }
  public submit(): void{
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    console.log('settings/company', this.form.value);
  }
}

