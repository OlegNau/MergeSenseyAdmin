import type { Environment } from '@abp/ng.core';

export const environment: Environment = {
  production: false,
  application: {
    name: 'AICodeReview',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44396/',          // ВАЖНО: с завершающим слешем
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
    clientId: 'MergeSenseyAdmin_Angular',
    responseType: 'code',
    scope: 'openid profile offline_access AICodeReview',
    requireHttps: true,
    strictDiscoveryDocumentValidation: true,
    showDebugInformation: true,
    sessionChecksEnabled: false,
  },
  apis: {
    default: {
      url: 'https://localhost:44396',
    },
  },
};
