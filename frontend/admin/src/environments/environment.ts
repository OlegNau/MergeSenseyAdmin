import { Environment } from '@abp/ng.core';

export const environment = {
  production: false,
  application: { baseUrl: 'http://localhost:4200', name: 'MergeSenseyAdmin' },
  oAuthConfig: {
    issuer: 'https://localhost:44396/',
    redirectUri: 'http://localhost:4200',              // <— ROOT, not /auth/callback
    clientId: 'MergeSenseyAdmin_Angular',
    responseType: 'code',
    scope: 'offline_access openid profile MergeSensei',
    requireHttps: false,
    strictDiscoveryDocumentValidation: false,
    showDebugInformation: true,
    sessionChecksEnabled: false,
  },
  apis: {
    default: { url: 'https://localhost:44396' },
    Default: { url: 'https://localhost:44396' },
  },
} as Environment;

