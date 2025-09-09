import { Environment } from '@abp/ng.core';

export const environment = {
  production: false,
  application: { baseUrl: 'http://localhost:4200', name: 'MergeSenseyAdmin' },
  oAuthConfig: {
    issuer: 'https://localhost:44396',
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
    clientId: 'MergeSenseyAdmin_Angular',
    responseType: 'code',
    scope: 'openid profile offline_access MergeSensei',
    requireHttps: true,
    strictDiscoveryDocumentValidation: false,
    showDebugInformation: true,
    sessionChecksEnabled: false,
  },
  apis: {
    default: { url: 'https://localhost:44396' },
    Default: { url: 'https://localhost:44396' },
  },
} as Environment;
