import Input from ".";
import "@/style/global.css";

describe("<Input />", () => {
  it("should render Input", () => {
    cy.mount(<Input />);

    cy.get("input").should("be.visible");
  });

  it("should render Input with start and end icon", () => {
    cy.mount(<Input startIcon={<div>start</div>} endIcon={<div>end</div>} />);

    cy.get("[data-cy=container-input]")
      .should("exist")
      .should("include.text", "start")
      .should("include.text", "end");
  });

  it("should render Input with onClick event", () => {
    const fuc = {
      call() {},
    };

    cy.spy(fuc, "call").as("inputClick");

    cy.mount(<Input onInputClick={fuc.call} />);

    cy.get("[data-cy=container-input]").should("exist").click();
    cy.get("@inputClick").should("have.been.called");
  });

  it("should render Input focus", () => {
    cy.mount(<Input />);

    cy.get("[data-cy=container-input]")
      .should("exist")
      .click()
      .should("have.class", "border-[#7B58FF]");

    cy.get("input").should("have.focus");
  });

  it("should render with focus event", () => {
    const fuc = {
      call() {},
    };

    cy.spy(fuc, "call").as("inputFocus");

    cy.mount(<Input onInputFocus={fuc.call} />);

    cy.get("[data-cy=container-input]").should("exist").click();
    cy.get("input").should("have.focus");
    cy.get("@inputFocus").should("have.been.called");
  });

  it("should render with blur event", () => {
    const fuc = {
      call() {},
    };

    cy.spy(fuc, "call").as("inputBlur");

    cy.mount(<Input onInputBlur={fuc.call} />);

    cy.get("[data-cy=container-input]").should("exist").click();
    cy.get("body").click("bottomLeft");
    cy.get("@inputBlur").should("have.been.called");
  });

  it("should render with mask", () => {
    cy.mount(<Input mask="99/99/9999" />);
    cy.get("input").invoke("val", "22012000").click();
    cy.get("input").should("have.value", "22/01/2000");
  });

  it("should render with className merge", () => {
    cy.mount(<Input mask="99/99/9999" className="h-10" />);
    cy.get("[data-cy=container-input]").should("have.class", "h-10");
  });
});
