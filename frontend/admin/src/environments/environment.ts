import { Environment } from '@abp/ng.core';

export const environment = {
  production: false,
  application: { baseUrl: 'http://localhost:4200', name: 'MergeSenseyAdmin' },
  oAuthConfig: {
    issuer: 'https://localhost:44396/',
    loginUrl: 'https://localhost:44396/connect/authorize',   // fallback для authorize
    tokenEndpoint: 'https://localhost:44396/connect/token',  // fallback для token
    redirectUri: 'http://localhost:4200',                    // или со слэшем, но 1-в-1 как в БД
    postLogoutRedirectUri: 'http://localhost:4200',
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

