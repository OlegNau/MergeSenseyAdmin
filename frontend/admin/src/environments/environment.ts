import { Environment } from '@abp/ng.core';

const baseUrl = window.location.origin;

export const environment = {
  production: false,
  application: { baseUrl, name: 'MergeSenseyAdmin' },
  oAuthConfig: {
    issuer: 'https://localhost:44396/',          // trailing slash is required
    redirectUri: `${baseUrl}/auth/callback`,     // explicit callback
    clientId: 'MergeSensei_App',
    responseType: 'code',
    scope: 'offline_access openid profile MergeSensei',
    requireHttps: true,
    strictDiscoveryDocumentValidation: false, // dev-friendly
  },
  apis: {
    default: { url: 'https://localhost:44396' },
    Default: { url: 'https://localhost:44396' },
  },
} as Environment;
