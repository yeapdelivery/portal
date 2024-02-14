import "@/style/global.css";
import Header from ".";

describe("<Header />", () => {
  beforeEach(() => {
    cy.viewport(1920, 1080);
  });

  it("should render Header", () => {
    cy.mount(
      <Header
        img="https://s.gravatar.com/avatar/acae2c8179348cfd3bd5013b49d4c4be?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fye.png"
        name="yeap delivery"
      />
    );

    cy.get("[data-cy=logo-mobile]").should("not.be.visible");
    cy.get("[data-cy=header-container]").should("exist");
  });

  it("should render Header with text need help", () => {
    cy.mount(
      <Header
        img="https://s.gravatar.com/avatar/acae2c8179348cfd3bd5013b49d4c4be?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fye.png"
        name="yeap delivery"
      />
    );

    cy.get("[data-cy=help]").should("have.text", "Preciso de ajuda");
  });

  it("should render Header correct profile", () => {
    cy.mount(
      <Header
        img="https://s.gravatar.com/avatar/acae2c8179348cfd3bd5013b49d4c4be?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fye.png"
        name="yeap delivery"
      />
    );

    cy.get("[data-cy=profile]")
      .should("exist")
      .should("have.text", "yeap delivery");

    cy.get("[data-cy=profile]")
      .children()
      .should(
        "have.attr",
        "src",
        "/_next/image?url=https%3A%2F%2Fs.gravatar.com%2Favatar%2Facae2c8179348cfd3bd5013b49d4c4be%3Fs%3D480%26r%3Dpg%26d%3Dhttps%253A%252F%252Fcdn.auth0.com%252Favatars%252Fye.png&w=96&q=75"
      );
  });

  it("should render Header on mobile", () => {
    cy.viewport(375, 812);

    cy.mount(
      <Header
        img="https://s.gravatar.com/avatar/acae2c8179348cfd3bd5013b49d4c4be?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fye.png"
        name="yeap delivery"
      />
    );

    cy.get("[data-cy=profile]").should("not.be.visible");
    cy.get("[data-cy=help]").should("not.be.visible");

    cy.get("[data-cy=logo-mobile]").should("be.visible");
    cy.get("[data-cy=logo-mobile]")
      .children()
      .should("have.attr", "src", "logo-menu.svg");
  });
});
