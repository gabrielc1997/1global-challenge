describe("Add new user after login", () => {
  it("logs in and adds a new user", () => {

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


    cy.get('[data-testid="add"]').click();


    cy.get('[data-testid="first_name"]').type("John");
    cy.get('[data-testid="last_name"]').type("Doe");
    cy.get('[data-testid="email"]').type("john.doe@example.com");
    cy.get('[data-testid="avatar"]').type("https://example.com/avatar.jpg");

    // Submete
    cy.get('[data-testid="save"]').click();

  });
});