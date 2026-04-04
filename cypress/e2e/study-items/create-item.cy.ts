describe('Study Items — Create', () => {
  const unique = Date.now();
  const email = `items${unique}@test.com`;
  const password = 'senha123';

  before(() => {
    cy.request('POST', `${Cypress.env('apiUrl')}/users`, {
      name: 'Items Test', email, password
    });
  });

  beforeEach(() => {
    cy.loginViaApi(email, password);
    cy.visit('/study-items');
  });

  it('should create a study item and show it in the list', () => {
    cy.get('input[placeholder*="Assunto" i]').type('Angular Signals');
    cy.get('textarea').type('Estudar NgRx Signal Store em detalhes');
    cy.contains('button', /adicionar/i).click();
    cy.contains('Angular Signals').should('be.visible');
  });

  it('should show the item immediately (optimistic update)', () => {
    cy.get('input[placeholder*="Assunto" i]').type('Optimistic Test');
    cy.get('textarea').type('Este item deve aparecer imediatamente');
    cy.contains('button', /adicionar/i).click();
    cy.contains('Optimistic Test').should('be.visible');
    cy.contains('Salvando...').should('be.visible');
  });
});

