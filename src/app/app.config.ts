import { ApplicationConfig, ErrorHandler, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './interceptors/auth.interceptor';
import { httpErrorInterceptor } from './core/errors/http-error.interceptor';
import { GlobalErrorHandler } from './core/errors/global-error-handler';
import { environment } from '../environments/environment';
import * as Sentry from '@sentry/angular';

if (environment.sentryDsn) {
  Sentry.init({
    dsn: environment.sentryDsn,
    environment: environment.production ? 'production' : 'development',
    tracesSampleRate: environment.production ? 0.1 : 1.0,
    integrations: [
      Sentry.browserTracingIntegration(),
      Sentry.replayIntegration({ maskAllText: false, blockAllMedia: false }),
    ],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor, httpErrorInterceptor])),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    ...(environment.sentryDsn
      ? [
          { provide: ErrorHandler, useValue: Sentry.createErrorHandler({ showDialog: false }) },
          Sentry.TraceService,
        ]
      : []),
  ]
};
