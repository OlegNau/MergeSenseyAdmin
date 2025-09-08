import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: { baseUrl, name: 'MergeSenseyAdmin' },
  oAuthConfig: {
    issuer: 'https://localhost:44396/',
    redirectUri: `${baseUrl}/auth/callback`,
    clientId: 'MergeSenseyAdmin_Angular',
    responseType: 'code',
    scope: 'offline_access openid profile AICodeReview',

    requireHttps: false,
    strictDiscoveryDocumentValidation: false,
    showDebugInformation: true,
    // На всякий случай отключим сессионные проверки в DEV:
    sessionChecksEnabled: false,
  },
  apis: {
    default: { url: 'https://localhost:44396' },
    Default: { url: 'https://localhost:44396' },
  },
} as Environment;

