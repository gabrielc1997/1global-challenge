describe("Delete new user after login", () => {
  it("logs in and edits the first user", () => {
    cy.intercept("POST", "**/api/login", {
      statusCode: 200,
      body: { token: "QpwL5tke4Pnpja7X4" },
    }).as("loginRequest");

    cy.visit("/login");

    cy.get('[data-testid="email"]').type("eve.holt@reqres.in");
    cy.get('[data-testid="password"]').type("cityslicka");
    cy.get('[data-testid="send-button"]').click();

    cy.wait("@loginRequest");

    cy.url().should("include", "/welcome");

    cy.get('[data-testid="delete"]').first().click();
    cy.get('[data-testid="confirm"]').click();




  });
});