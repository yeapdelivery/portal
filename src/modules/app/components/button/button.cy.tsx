import React from "react";
import { Button } from "./";
import "@/style/global.css";

describe("<Button />", () => {
  it("should render button", () => {
    cy.mount(<Button>Button</Button>);
    cy.get("button").should("have.text", "Button");
  });

  it("should render button without a variant props", () => {
    cy.mount(<Button>Button</Button>);
    cy.get("button").should("have.class", "bg-red-default");
    cy.get("button").click().should("have.class", "active:animate-pulse-click");
  });

  it("should render button with primary variant props", () => {
    cy.mount(<Button>Button</Button>);
    cy.get("button").should("have.class", "bg-red-default");
    cy.get("button").click().should("have.class", "active:animate-pulse-click");
  });

  it("should render button with variant props as secondary", () => {
    cy.mount(<Button variant="secondary">Button secondary</Button>);
    const button = cy.get("button");

    button.should("have.class", "bg-transparent");
    button.click().should("have.class", "active:animate-pulse-click");
  });

  it("should render button with variant props as check", () => {
    cy.mount(<Button variant="check">Button check</Button>);
    const button = cy.get("button");

    button.should("have.class", "bg-green-default");
    button.click().should("have.class", "active:animate-pulse-click");
  });

  it("should render button with variant props as error", () => {
    cy.mount(<Button variant="error">Button error</Button>);
    const button = cy.get("button");

    button.should("have.class", "bg-error-default");
    button.click().should("have.class", "active:animate-pulse-click");
  });

  it("should render button with variant props as success", () => {
    cy.mount(<Button variant="success">Button error</Button>);
    const button = cy.get("button");

    button.should("have.class", "border-green-primary-dark");
    button.click().should("have.class", "active:animate-pulse-click");
  });

  it("should render button with a variant props as primary and disabled props", () => {
    cy.mount(
      <Button variant="primary" disabled>
        Button
      </Button>
    );
    const button = cy.get("button");

    button.should("have.class", "bg-gray-1000");
    button.should("have.class", "cursor-not-allowed");
    button.should("have.class", "select-none");
    button.should("have.class", "active:animate-none");

    button.should("have.attr", "disabled");
  });
});
