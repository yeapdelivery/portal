import { Toast } from ".";
import "@/style/global.css";
import { ToastType } from "./types";

describe("<Toast />", () => {
  it("should render Toast", () => {
    cy.mount(
      <Toast
        message="Vai Neymar"
        open={true}
        setOpen={() => {}}
        type={ToastType.SUCCESS}
      />
    );

    cy.get("[data-test=toast-container]").should("be.visible");
  });

  it("should verify message", () => {
    cy.mount(
      <Toast
        message="Vai Neymar"
        open={true}
        setOpen={() => {}}
        type={ToastType.SUCCESS}
      />
    );

    cy.get("[data-test=toast-message]")
      .should("be.visible")
      .should("have.text", "Vai Neymar");
  });

  it("verify function setOpen", () => {
    const fuc = {
      call() {},
    };

    cy.spy(fuc, "call").as("setOpen");

    cy.mount(
      <Toast
        message="Vai Neymar"
        open={true}
        setOpen={fuc.call}
        type={ToastType.SUCCESS}
      />
    );

    cy.get("[data-test=toast-container]").should("be.visible");

    cy.get("[data-test=toast-close]").click();
    cy.get("@setOpen").should("have.been.called");
  });

  it("verify success toast type", () => {
    cy.mount(
      <Toast
        message="Vai Neymar"
        open={true}
        setOpen={() => {}}
        type={ToastType.SUCCESS}
      />
    );

    cy.get("[data-test=toast-container]")
      .should("be.visible")
      .should("have.class", "bg-green-100 border-green-500 border");
  });

  it("verify error toast type", () => {
    cy.mount(
      <Toast
        message="Vai Neymar"
        open={true}
        setOpen={() => {}}
        type={ToastType.ERROR}
      />
    );

    cy.get("[data-test=toast-container]")
      .should("be.visible")
      .should("have.class", "bg-red-100 border-red-500 border");
  });

  it("verify info toast type", () => {
    cy.mount(
      <Toast
        message="Vai Neymar"
        open={true}
        setOpen={() => {}}
        type={ToastType.INFO}
      />
    );

    cy.get("[data-test=toast-container]")
      .should("be.visible")
      .should("have.class", "bg-blue-100 border-blue-500 border");
  });

  it("verify warning toast type", () => {
    cy.mount(
      <Toast
        message="Vai Neymar"
        open={true}
        setOpen={() => {}}
        type={ToastType.WARNING}
      />
    );

    cy.get("[data-test=toast-container]")
      .should("be.visible")
      .should("have.class", "bg-yellow-100 border-yellow-500 border");
  });
});
