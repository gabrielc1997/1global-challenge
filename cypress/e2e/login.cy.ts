describe('Login Flow - Reqres API', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('logs in successfully with valid Reqres credentials', () => {

    cy.intercept('POST', 'https://reqres.in/api/login', {
      statusCode: 200,
      body: { token: 'fake-jwt-token' },
    }).as('loginRequest');

    cy.get('[data-testid="email"]').type('eve.holt@reqres.in');
    cy.get('[data-testid="password"]').type('cityslicka');


    cy.get('[data-testid="send-button"]').click();


    cy.url().should('include', '/welcome');
  });


});
