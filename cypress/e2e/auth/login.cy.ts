describe('Login', () => {
  const unique = Date.now();
  const email = `logintest${unique}@test.com`;
  const password = 'senha123';

  before(() => {
    cy.request('POST', `${Cypress.env('apiUrl')}/users`, {
      name: 'Login Test', email, password
    });
  });

  it('should login successfully and redirect to study items', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type(password);
    cy.get('button[type="submit"], button').contains(/entrar|login/i).click();
    cy.url().should('include', '/study-items');
    expect(localStorage.getItem('token')).to.not.be.null;
  });

  it('should show error with wrong credentials', () => {
    cy.visit('/login');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type('wrong_password');
    cy.get('button[type="submit"], button').contains(/entrar|login/i).click();
    cy.contains(/erro|credenciais|inválid/i).should('be.visible');
  });
});

