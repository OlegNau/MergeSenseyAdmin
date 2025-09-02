// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CoreModule } from '@abp/ng.core';
import { AbpOAuthModule } from '@abp/ng.oauth';
import { ThemeSharedModule } from '@abp/ng.theme.shared';

import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export const registerLocaleFn = (locale: string) =>
  import(/* @vite-ignore */ `@angular/common/locales/${locale}.mjs`)
    .then(m => registerLocaleData(m.default));

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule.forRoot({ environment, registerLocaleFn }),
    AbpOAuthModule.forRoot(),
    ThemeSharedModule.forRoot(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
