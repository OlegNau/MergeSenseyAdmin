import { Environment } from '@abp/ng.core';

const baseUrl = window.location.origin;
const oAuthConfig = {
  issuer: 'https://localhost:44396/',
  redirectUri: baseUrl,
  clientId: 'MergeSensei_App',
  responseType: 'code',
  scope: 'offline_access openid profile MergeSensei',
  requireHttps: true,
};

export const environment = {
  production: true,
  application: { baseUrl, name: 'MergeSenseyAdmin' },
  oAuthConfig,
  apis: {
    default: {
      url: 'https://localhost:44396',
    },
    Default: {
      url: 'https://localhost:44396',
    },
  },
} as Environment;
