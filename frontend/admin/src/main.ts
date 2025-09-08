import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

import { provideAbpCore, withOptions } from '@abp/ng.core';
import { provideAbpOAuth } from '@abp/ng.oauth';
import { environment } from './environments/environment';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAbpCore(withOptions({
      environment,
      registerLocaleFn: (locale: string) => {
        const loaders: Record<string, () => Promise<unknown>> = {
          ru: () => import('@angular/common/locales/ru'),
          en: () => import('@angular/common/locales/en'),
          de: () => import('@angular/common/locales/de'),
          fr: () => import('@angular/common/locales/fr'),
        };
        const key = (locale || 'en').toLowerCase();
        const load = loaders[key] ?? loaders['en'];
        return load().then(m => (m as any).default ?? m);
      },
    })),
    provideAbpOAuth(),
  ],
}).catch(err => console.error(err));
