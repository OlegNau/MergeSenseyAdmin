export const environment = {
  production: false,
  oAuthConfig: {
    issuer: 'https://localhost:44396',
    clientId: 'MergeSenseyAdmin_Angular',
    scope: 'openid profile email roles offline_access AICodeReview',
    responseType: 'code',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44396'
    }
  }
};
