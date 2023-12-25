describe("login", () => {
  before(() => {
    cy.login("yancesa.07@gmail.com", "2020@Senha");
  });

  after(() => {
    cy.logout();
  });

  it("should successfully log into our app", () => {
    cy.visit("/");
    cy.url().should("include", "/pedidos");
  });

  it("should keep on order page when user is not logged", () => {
    cy.logout();
    cy.visit("/pedidos");
    cy.url().should("include", "/");
  });
});
