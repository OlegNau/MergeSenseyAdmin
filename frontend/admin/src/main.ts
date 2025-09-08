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
        const base = `@angular/common/locales/${locale}`;
        return import(base)
          .then(m => (m as any).default ?? m)
          .catch(async () => {
            try {
              const mod = await import(`${base}.js`);
              return (mod as any).default ?? mod;
            } catch {
              try {
                const mod = await import(`${base}.mjs`);
                return (mod as any).default ?? mod;
              } catch {
                // last resort: load English so pipes work
                const en = await import(`@angular/common/locales/en`);
                return (en as any).default ?? en;
              }
            }
          });
      },
    })),
    provideAbpOAuth(),
  ],
}).catch(err => console.error(err));
