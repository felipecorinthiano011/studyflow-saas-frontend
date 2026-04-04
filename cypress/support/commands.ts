// cypress/support/commands.ts

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      loginViaApi(email: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add('loginViaApi', (email: string, password: string) => {
  cy.request('POST', `${Cypress.env('apiUrl')}/auth/login`, { email, password })
    .then(res => {
      localStorage.setItem('token', res.body.token);
    });
});

export {};

