import { Environment } from '@abp/ng.core';

const baseUrl = 'https://your-prod-host'; // TODO: set your prod SPA origin

export const environment = {
  production: true,
  application: { baseUrl, name: 'MergeSenseyAdmin' },
  oAuthConfig: {
    issuer: 'https://your-prod-api',      // TODO: set your prod API origin
    redirectUri: baseUrl,                  // root redirect in prod too
    clientId: 'MergeSenseyAdmin_Angular',  // must match prod client in OpenIddict
    responseType: 'code',
    scope: 'openid profile offline_access AICodeReview',
    requireHttps: true,
    strictDiscoveryDocumentValidation: true,
    showDebugInformation: false,
    sessionChecksEnabled: false,
  },
  apis: {
    default: { url: 'https://your-prod-api' },
    Default: { url: 'https://your-prod-api' },
  },
} as Environment;

