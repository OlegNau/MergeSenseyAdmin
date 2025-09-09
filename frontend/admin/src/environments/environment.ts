import { Environment } from '@abp/ng.core';

export const environment: Environment = {
  production: false,
  application: {
    baseUrl: 'http://localhost:4200',
    name: 'MergeSenseiAdmin',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44396/', // как в discovery (со слешом)
    redirectUri: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200',
    clientId: 'MergeSenseiAdmin_Angular', // 1-в-1 с сидером
    responseType: 'code',
    scope: 'openid profile offline_access MergeSensei',
    requireHttps: true,
    strictDiscoveryDocumentValidation: false, // dev: не валимся на / vs без /
    showDebugInformation: true,
    sessionChecksEnabled: false,
  },
  apis: {
    default: { url: 'https://localhost:44396' },
    Default: { url: 'https://localhost:44396' },
  },
};
