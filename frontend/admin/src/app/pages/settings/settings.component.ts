import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsComponent {
  // TODO: i18n
  activeTab = 'company';

  language = 'en';

  companyForm: FormGroup;
  teamForm: FormGroup;
  securityForm: FormGroup;
  notificationsForm: FormGroup;
  languageForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      name: ['Acme Corporation'],
      website: ['https://acme.com'],
      description: [
        this.language === 'ru'
          ? 'Ведущая технологическая компания, специализирующаяся на инновационных решениях.'
          : 'Leading technology company focused on innovative solutions.',
      ],
    });

    this.teamForm = this.fb.group({
      autoAddMembers: [false],
      requireApproval: [true],
    });

    this.securityForm = this.fb.group({
      twoFactor: [true],
      sessionTimeout: [true],
      ipRestrictions: [false],
    });

    this.notificationsForm = this.fb.group({
      pipelineFailures: [true],
      securityAlerts: [true],
      weeklyReports: [true],
    });

    this.languageForm = this.fb.group({
      language: [this.language],
    });
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  saveCompany() {
    console.log(this.companyForm.value);
  }

  saveTeam() {
    console.log(this.teamForm.value);
  }

  saveSecurity() {
    console.log(this.securityForm.value);
  }

  saveNotifications() {
    console.log(this.notificationsForm.value);
  }

  saveLanguage() {
    console.log(this.languageForm.value);
  }

  setLanguage(lang: string) {
    this.language = lang;
    this.languageForm.patchValue({ language: lang });
  }
}

