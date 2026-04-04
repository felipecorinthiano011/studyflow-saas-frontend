describe('Study Items — Delete', () => {
  const unique = Date.now();
  const email = `delete${unique}@test.com`;
  const password = 'senha123';
  let token: string;

  before(() => {
    cy.request('POST', `${Cypress.env('apiUrl')}/users`, {
      name: 'Delete Test', email, password
    }).then(() => {
      cy.request('POST', `${Cypress.env('apiUrl')}/auth/login`, { email, password })
        .then(res => { token = res.body.token; });
    });
  });

  beforeEach(() => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/study-items`,
      headers: { Authorization: `Bearer ${token}` },
      body: { title: 'Item para deletar', description: 'Será excluído' }
    });
    cy.loginViaApi(email, password);
    cy.visit('/study-items');
  });

  it('should delete a study item', () => {
    cy.contains('Item para deletar').should('be.visible');
    cy.contains('button', /excluir/i).first().click();
    cy.on('window:confirm', () => true);
    cy.contains('Item para deletar').should('not.exist');
  });

  it('should delete all study items', () => {
    cy.contains(/limpar tudo/i).click();
    cy.on('window:confirm', () => true);
    cy.contains(/nenhum item/i).should('be.visible');
  });
});

