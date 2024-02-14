import getScreenSize from "@/utils/get-screen-size";
import Dialog from ".";
import "@/style/global.css";

const largeScreenSize = getScreenSize("lg");
const smallScreenSize = getScreenSize("sm");
const height = 1080;

describe("<Dialog />", () => {
  it("Should render Dialog", () => {
    cy.mount(
      <Dialog>
        <Dialog.Button>Open</Dialog.Button>
        <Dialog.Content title="Um titulo">
          <div>content</div>
        </Dialog.Content>
      </Dialog>
    );

    cy.get("[data-cy-root]").should("exist").should("be.visible");
  });

  it("Should verify children button", () => {
    cy.mount(
      <Dialog>
        <Dialog.Button data-test="trigger">Open</Dialog.Button>
        <Dialog.Content title="Um titulo">
          <div>content</div>
        </Dialog.Content>
      </Dialog>
    );

    cy.get("[data-test=trigger]")
      .should("exist")
      .should("be.visible")
      .should("have.text", "Open");
  });

  it("Should open modal when button was clicked.", () => {
    cy.viewport(largeScreenSize, height);

    cy.mount(
      <Dialog>
        <Dialog.Button data-test="trigger">Open</Dialog.Button>
        <Dialog.Content title="Um titulo">
          <div>content</div>
        </Dialog.Content>
      </Dialog>
    );

    cy.get("[data-test=trigger]").click();

    cy.get("[data-test=overlay]")
      .should("exist")
      .should("be.visible")
      .should("have.css", "opacity", "1")
      .should("have.attr", "data-state", "open");

    cy.get("[data-test=dialog-content]")
      .should("exist")
      .should("be.visible")
      .should("have.attr", "data-state", "open")
      .should("have.css", "opacity", "1")
      .should(
        "have.css",
        "animation",
        "0.3s linear 0s 1 normal none running fade-in-left"
      );
  });

  it("Should close modal when close button was clicked.", () => {
    cy.viewport(largeScreenSize, height);

    cy.mount(
      <Dialog>
        <Dialog.Button data-test="trigger">Open</Dialog.Button>
        <Dialog.Content title="Um titulo">
          <div>content</div>
        </Dialog.Content>
      </Dialog>
    );

    cy.get("[data-test=trigger]").click();
    cy.get("[data-test=dialog-close]").click();

    cy.get("[data-test=overlay]").should("not.exist");
    cy.get("[data-test=dialog-content]").should("not.exist");
  });

  it("Should verify the title props.", () => {
    cy.viewport(largeScreenSize, height);

    cy.mount(
      <Dialog>
        <Dialog.Button data-test="trigger">Open</Dialog.Button>
        <Dialog.Content title="Um titulo">
          <div>content</div>
        </Dialog.Content>
      </Dialog>
    );

    cy.get("[data-test=trigger]").click();
    cy.get("[data-test=dialog-title]").should("have.text", "Um titulo");
  });

  it("Should verify the titleSlot props.", () => {
    cy.viewport(largeScreenSize, height);

    cy.mount(
      <Dialog>
        <Dialog.Button data-test="trigger">Open</Dialog.Button>
        <Dialog.Content titleSlot={<div data-test="title-slot">Um titulo</div>}>
          <div>content</div>
        </Dialog.Content>
      </Dialog>
    );

    cy.get("[data-test=trigger]").click();
    cy.get("[data-test=title-slot]").should("have.text", "Um titulo");
  });

  it("Should verify the content.", () => {
    cy.viewport(largeScreenSize, height);

    cy.mount(
      <Dialog>
        <Dialog.Button data-test="trigger">Open</Dialog.Button>
        <Dialog.Content titleSlot={<div data-test="title-slot">Um titulo</div>}>
          content
        </Dialog.Content>
      </Dialog>
    );

    cy.get("[data-test=trigger]").click();
    cy.get("[data-test=dialog-content]").contains("content");
  });

  it("Should verify mobile layout.", () => {
    cy.viewport(smallScreenSize, height);

    cy.mount(
      <Dialog>
        <Dialog.Button data-test="trigger">Open</Dialog.Button>
        <Dialog.Content titleSlot={<div data-test="title-slot">Um titulo</div>}>
          content
        </Dialog.Content>
      </Dialog>
    );

    cy.get("[data-test=trigger]").click();
    cy.get("[data-test=dialog-content]").should("have.css", "left", "0px");
  });
});
