import "@/style/global.css";
import StatusOpen from ".";

describe("<StatusOpen />", () => {
  it("should render StatusOpen", () => {
    cy.mount(<StatusOpen />);

    cy.get("[data-cy=status-open]").should("exist");
  });

  it("should render status close on render", () => {
    cy.mount(<StatusOpen />);
    cy.get("[data-cy=current-status]")
      .should("exist")
      .should("have.class", "bg-[#FEEAEC] text-red-primary-dark")
      .should("have.text", "Loja fechada");
  });

  it("should render status open", () => {
    cy.mount(<StatusOpen />);

    cy.get("[data-cy=current-status]").click();

    cy.get("[data-cy=choice-status]").click();

    cy.get("[data-cy=current-status]")
      .should("exist")
      .should("have.class", "bg-[#E7F8F7] text-green-primary-dark")
      .should("have.text", "Loja aberta");
  });

  it("should rotate arrow", () => {
    cy.mount(<StatusOpen />);

    cy.get("[data-cy=current-status]").click();

    cy.get("[data-cy=arrow]").should(
      "have.class",
      "data-[state=open]:rotate-180"
    );
  });
});
