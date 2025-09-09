import { Environment } from '@abp/ng.core';

export const environment: Environment = {
  production: false,
  application: {
    baseUrl: 'http://localhost:4200',
    name: 'MergeSenseyAdmin',
  },
  oAuthConfig: {
    // ВАЖНО: значение должно строго совпадать с issuer из discovery; слеш в конце обязателен
    issuer: 'https://localhost:44396/',
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
    clientId: 'MergeSenseyAdmin_Angular',
    responseType: 'code',
    scope: 'openid profile offline_access MergeSensei',
    requireHttps: true,
    strictDiscoveryDocumentValidation: true,
    showDebugInformation: true,
    sessionChecksEnabled: false,
  },
  apis: {
    default: { url: 'https://localhost:44396' },
    Default: { url: 'https://localhost:44396' },
  },
};
