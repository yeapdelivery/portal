import "@/style/global.css";
import { Header } from ".";

describe("<Header />", () => {
  it("should render background image", () => {
    cy.mount(<Header />);

    cy.get("[data-cy=background-image]")
      .should("exist")
      .should("have.class", "w-full");
  });

  it("should render div with justify between", () => {
    cy.mount(<Header />);

    cy.get("[data-cy=container-logo-button]")
      .should("exist")
      .should("have.class", "gap-6 flex");
  });

  it("should render a type logo", () => {
    cy.mount(<Header />);
    cy.get("[data-cy=type-logo]").should("exist").should("have.class", "ml-6");
  });

  it("should render company name", () => {
    cy.mount(<Header />);

    cy.get("[data-cy=company-name]")
      .should("exist")
      .should("have.class", "text-gray-100 font-outfit text-lg font-bold")
      .should("have.text", "Insano Burguer");
  });

  it("should render company email", () => {
    cy.mount(<Header />);

    cy.get("[data-cy=company-email]")
      .should("exist")
      .should("have.class", "text-gray-100 text-xs font-medium")
      .should("have.text", "twopaypal@gmail.com");
  });

  it("should render a cancel button", () => {
    cy.mount(<Header />);

    cy.get("[data-cy=cancel-button]")
      .should("exist")
      .should(
        "have.class",
        "text-gray-500 bg-transparent border border-solid border-gray-500"
      )
      .should("have.text", "Cancelar");
  });

  it("should render a save button", () => {
    cy.mount(<Header />);

    cy.get("[data-cy=save-button]")
      .should("exist")
      .should(
        "have.class",
        "bg-red-default text-white border-none hover:bg-red-primary-dark"
      )
      .should("have.text", "Salvar");
  });
});
