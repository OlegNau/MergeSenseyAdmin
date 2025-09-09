import { Environment } from '@abp/ng.core';

export const environment: Environment = {
  production: false,
  application: {
    baseUrl: 'http://localhost:4200',
    name: 'MergeSenseiAdmin',
  },
  oAuthConfig: {
    // dev: оставляем trailing slash и отключаем строгую валидацию, чтобы не спотыкаться об слеш
    issuer: 'https://localhost:44396/',
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',

    // ВАЖНО: буква "i" — как у всего проекта/скоупа
    clientId: 'MergeSenseiAdmin_Angular',

    responseType: 'code',
    scope: 'openid profile offline_access MergeSensei',
    requireHttps: true,

    // dev-профиль: не валим приложение, если discovery слегка отличается (слеш/метаданные)
    strictDiscoveryDocumentValidation: false,
    // на всякий случай игнорируем несовпадение issuer в discovery
    // (свойство поддерживается angular-oauth2-oidc)
    // @ts-ignore
    skipIssuerCheck: true,

    showDebugInformation: true,
    sessionChecksEnabled: false,
  },
  apis: {
    default: { url: 'https://localhost:44396' },
    Default: { url: 'https://localhost:44396' },
  },
};
