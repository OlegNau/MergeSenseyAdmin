import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: false,
  application: { baseUrl, name: 'MergeSenseyAdmin' },
  oAuthConfig: {
    issuer: 'https://localhost:44396/',            // слэш в конце
    redirectUri: `${baseUrl}/auth/callback`,
    clientId: 'MergeSensei_App',                   // совпадает с сидером
    responseType: 'code',
    scope: 'offline_access openid profile MergeSensei',

    requireHttps: false,                           // В DEV ОБЯЗАТЕЛЬНО false
    strictDiscoveryDocumentValidation: false,
    showDebugInformation: true,
  },
  apis: {
    default: { url: 'https://localhost:44396' },
    Default: { url: 'https://localhost:44396' },
  },
} as Environment;
