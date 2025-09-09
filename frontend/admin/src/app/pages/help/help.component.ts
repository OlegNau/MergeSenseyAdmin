import { ChangeDetectionStrategy, Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

type FaqItem = { q: string; a: string; cat: 'projects'|'pipelines'|'billing'|'account' };
type Quick = { title: string; desc: string; icon: 'book'|'rocket'|'api'|'changelog'; href: string };

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HelpComponent {
  private readonly fb = inject(FormBuilder);

  public query = signal('');
  public category = signal<'all'|'projects'|'pipelines'|'billing'|'account'>('all');
  public opened = signal<Set<number>>(new Set());

  public faqs: FaqItem[] = [
    { q: 'Как связать проект с GitHub/ GitLab?', a: 'Откройте “Projects → Create New Project”, на втором шаге выберите провайдера и укажите URL/ветку. Подключение токена можно сделать позже.', cat: 'projects' },
    { q: 'Почему пайплайн не запускается?', a: 'Проверьте триггер (manual/push/schedule) и токен доступа. В “All Pipelines” откройте детали и посмотрите логи последнего запуска.', cat: 'pipelines' },
    { q: 'Как включить двухфакторную аутентификацию?', a: 'Зайдите в “Settings → Security” и активируйте 2FA. Сохраните резервные коды.', cat: 'account' },
    { q: 'Где управлять тарифом и оплатой?', a: 'Раздел “Billing” (скоро). Временно — свяжитесь с поддержкой, укажите ID организации.', cat: 'billing' },
    { q: 'Можно ли запускать пайплайны по расписанию?', a: 'Да. В конфигурации укажите cron или выберите “schedule daily/weekly”.', cat: 'pipelines' },
    { q: 'Как поделиться доступом к проекту?', a: '“Settings → Team”: пригласите пользователя по email и назначьте роль (Viewer/Editor/Admin).', cat: 'projects' },
  ];

  public quick: Quick[] = [
    { title: 'Документация', desc: 'Руководства и best practices', icon: 'book', href: '#' },
    { title: 'Быстрый старт', desc: '5 шагов для запуска', icon: 'rocket', href: '#' },
    { title: 'API Reference', desc: 'REST/Webhook эндпоинты', icon: 'api', href: '#' },
    { title: 'Changelog', desc: 'Новые фичи и фиксы', icon: 'changelog', href: '#' },
  ];

  public filtered = computed(() => {
    const q = this.query().trim().toLowerCase();
    const cat = this.category();
    return this.faqs.filter(f =>
      (cat === 'all' || f.cat === cat) &&
      (!q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
    );
  });

  public toggle(i: number): void {
    const s = new Set(this.opened());
    s.has(i) ? s.delete(i) : s.add(i);
    this.opened.set(s);
  }

  public readonly form = this.fb.group({
    subject: ['', [Validators.required, Validators.minLength(5)]],
    category: ['general', [Validators.required]],
    severity: ['normal'],
    message: ['', [Validators.required, Validators.minLength(10)]],
    includeDiagnostics: [true],
    attachment: [null as File | null],
  });

  public onFile(ev: Event): void{
    const input = ev.target as HTMLInputElement;
    const file = input.files && input.files[0] ? input.files[0] : null;
    this.form.patchValue({ attachment: file });
  }

  public submit(): void{
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const payload = { ...this.form.value, app: { version: '0.1.0', build: 'dev' } };
    console.log('HELP TICKET', payload);
    alert('Спасибо! Мы свяжемся с вами по указанному каналу.');
    this.form.reset({ category: 'general', severity: 'normal', includeDiagnostics: true, attachment: null });
  }
}

