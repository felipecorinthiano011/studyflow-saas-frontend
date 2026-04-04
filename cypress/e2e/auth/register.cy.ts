describe('Register', () => {
  const unique = Date.now();
  const user = {
    name: 'Cypress Test',
    email: `cypress${unique}@test.com`,
    password: 'senha123'
  };

  it('should register a new user successfully', () => {
    cy.visit('/register');
    cy.get('input[placeholder*="nome" i], input[name="name"]').type(user.name);
    cy.get('input[type="email"]').type(user.email);
    cy.get('input[type="password"]').first().type(user.password);
    cy.get('button[type="submit"], button').contains(/registrar|criar|cadastrar/i).click();
    cy.url().should('include', '/login');
  });

  it('should show error for duplicate email', () => {
    cy.visit('/register');
    cy.get('input[placeholder*="nome" i], input[name="name"]').type(user.name);
    cy.get('input[type="email"]').type(user.email);
    cy.get('input[type="password"]').first().type(user.password);
    cy.get('button[type="submit"], button').contains(/registrar|criar|cadastrar/i).click();
    cy.contains(/erro|already|já/i).should('be.visible');
  });
});

