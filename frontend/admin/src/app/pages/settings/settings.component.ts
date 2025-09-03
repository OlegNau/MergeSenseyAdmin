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
  active: Tab = 'company';
  private readonly fb = inject(FormBuilder);
  readonly form = this.fb.group({
    companyName: ['Acme Corporation', [Validators.required]],
    website: ['https://acme.com', [Validators.required, Validators.pattern(/^https?:\/\/.+$/)]],
    description: ['Leading technology company focused on innovative solutions.'],
  });
  setTab(t: Tab){ this.active = t; }
  is(t: Tab){ return this.active === t; }
  submit(){
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    console.log('settings/company', this.form.value);
  }
}

