import TextArea from ".";
import "@/style/global.css";

describe("<TextArea/>", () => {
  it("should render TextArea", () => {
    cy.mount(<TextArea />);

    cy.get("[data-test=container-textArea]").should("be.visible");
  });

  it("should render TextArea with onClick event", () => {
    const fuc = {
      call() {},
    };

    cy.spy(fuc, "call").as("textAreaClick");

    cy.mount(<TextArea onInputClick={fuc.call} />);

    cy.get("[data-test=container-textArea]").should("exist").click();
    cy.get("@textAreaClick").should("have.been.called");
  });

  it("should render Input focus", () => {
    cy.mount(<TextArea />);

    cy.get("[data-test=container-textArea]")
      .should("exist")
      .click()
      .should("have.class", "border-[#7B58FF]");

    cy.get("textarea").should("have.focus");
  });

  it("should render with focus event", () => {
    const fuc = {
      call() {},
    };

    cy.spy(fuc, "call").as("inputFocus");

    cy.mount(<TextArea onInputFocus={fuc.call} />);

    cy.get("[data-test=container-textArea]").should("exist").click();
    cy.get("textarea").should("have.focus");
    cy.get("@inputFocus").should("have.been.called");
  });

  it("should render with blur event", () => {
    const fuc = {
      call() {},
    };

    cy.spy(fuc, "call").as("inputBlur");

    cy.mount(<TextArea onInputBlur={fuc.call} />);

    cy.get("[data-test=container-textArea]").should("exist").click();
    cy.get("body").click("bottomLeft");
    cy.get("@inputBlur").should("have.been.called");
  });
});
