export const environment = {
  production: true,
  apiUrl: 'https://studyflow-saas-production.up.railway.app',
  sentryDsn: (globalThis as any).__SENTRY_DSN__ ?? ''
};
