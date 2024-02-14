import Filed from ".";
import "@/style/global.css";

describe("<Filed />", () => {
  it("should render Filed", () => {
    cy.mount(
      <Filed htmlFor="render-test" label="render test" error={null}>
        render test
      </Filed>
    );

    cy.get("label").should("have.text", "render test");
  });

  it("should render Filed with htmlFor att", () => {
    cy.mount(
      <Filed htmlFor="render-test" label="render test" error={null}>
        render test
      </Filed>
    );

    cy.get("label").should("have.attr", "for").and("eq", "render-test");
  });

  it("should render Filed with error", () => {
    cy.mount(
      <Filed
        htmlFor="render-test"
        label="render test"
        error="Preenche o campo corretamente"
      >
        render test
      </Filed>
    );

    cy.get("span").should("have.text", "Erro: Preenche o campo corretamente");
  });
});
