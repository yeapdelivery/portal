import React from "react";
import { CardLoading } from ".";
import "@/style/global.css";

describe("<CardLoading />", () => {
  it("should render CardLoading", () => {
    cy.mount(<CardLoading />);
    cy.get("[data-cy=card-loading]")
      .should("exist")
      .should("have.class", "animate-pulse");
  });
});
