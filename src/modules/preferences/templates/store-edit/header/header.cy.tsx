import "@/style/global.css";
import { Header } from ".";

describe("<Header />", () => {
  it("should render background image", () => {
    cy.mount(
      <Header
        backgroundImage="/Rectangle.svg"
        cancel={() => {}}
        name="Insano Burguer"
        profileImage="/Ellipse.svg"
        save={() => {}}
      />
    );

    cy.get("[data-test=background-image]").should("exist");
  });

  it("should render a type logo", () => {
    cy.mount(
      <Header
        backgroundImage="/Rectangle.svg"
        cancel={() => {}}
        name="Insano Burguer"
        profileImage="/Ellipse.svg"
        save={() => {}}
      />
    );
    cy.get("[data-test=type-logo]").should("exist");
  });

  it("should render company name", () => {
    cy.mount(
      <Header
        backgroundImage="/Rectangle.svg"
        cancel={() => {}}
        name="Insano Burguer"
        profileImage="/Ellipse.svg"
        save={() => {}}
      />
    );

    cy.get("[data-test=company-name]")
      .should("exist")
      .should("have.text", "Insano Burguer");
  });

  it("should render company email", () => {
    cy.mount(
      <Header
        backgroundImage="/Rectangle.svg"
        cancel={() => {}}
        name="Insano Burguer"
        profileImage="/Ellipse.svg"
        save={() => {}}
      />
    );

    cy.get("[data-test=company-email]")
      .should("exist")
      .should("have.text", "twopaypal@gmail.com");
  });

  it("should render a cancel button", () => {
    cy.mount(
      <Header
        backgroundImage="/Rectangle.svg"
        cancel={() => {}}
        name="Insano Burguer"
        profileImage="/Ellipse.svg"
        save={() => {}}
      />
    );

    cy.get("[data-test=cancel-button]")
      .should("exist")
      .should("have.text", "Cancelar");
  });

  it("should render a save button", () => {
    cy.mount(
      <Header
        backgroundImage="/Rectangle.svg"
        cancel={() => {}}
        name="Insano Burguer"
        profileImage="/Ellipse.svg"
        save={() => {}}
      />
    );

    cy.get("[data-test=save-button]")
      .should("exist")
      .should("have.text", "Salvar");
  });

  it("there should be an onClick function on the save button", () => {
    cy.mount(
      <Header
        backgroundImage="/Rectangle.svg"
        cancel={() => {}}
        name="Insano Burguer"
        profileImage="/Ellipse.svg"
        save={() => {}}
      />
    );
    const fuc = {
      call() {},
    };

    cy.get("[data-test=save-button]").should("exist");
    cy.spy(fuc, "call").as("onClick");
  });

  it("there should be an onClick function on the cancel button", () => {
    cy.mount(
      <Header
        backgroundImage="/Rectangle.svg"
        cancel={() => {}}
        name="Insano Burguer"
        profileImage="/Ellipse.svg"
        save={() => {}}
      />
    );
    const fuc = {
      call() {},
    };

    cy.get("[data-test=cancel-button]").should("exist");
    cy.spy(fuc, "call").as("onClick");
  });
});
