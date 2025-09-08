import { Environment } from '@abp/ng.core';

const baseUrl = window.location.origin;

export const environment = {
  production: true,
  application: { baseUrl, name: 'MergeSenseyAdmin' },
  oAuthConfig: {
    issuer: 'https://localhost:44396/',
    redirectUri: `${baseUrl}/auth/callback`,
    clientId: 'MergeSensei_App',
    responseType: 'code',
    scope: 'offline_access openid profile MergeSensei',
    requireHttps: true,
  },
  apis: {
    default: { url: 'https://localhost:44396' },
    Default: { url: 'https://localhost:44396' },
  },
} as Environment;
