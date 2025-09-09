import type { Environment } from '@abp/ng.core';

export const environment: Environment = {
  production: false,
  application: {
    name: 'AICodeReview',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44396/',          // с завершающим слешем
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
    clientId: 'MergeSenseyAdmin_Angular',
    responseType: 'code',
    scope: 'openid profile AICodeReview',         // БЕЗ offline_access (если не нужен)
    requireHttps: true,
    strictDiscoveryDocumentValidation: true,
    showDebugInformation: true,
    sessionChecksEnabled: false,
  },
  apis: {
    default: { url: 'https://localhost:44396' },
  },
};
