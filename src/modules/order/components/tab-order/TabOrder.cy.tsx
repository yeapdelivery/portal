import React from "react";
import { OrderStatus } from "../../enums";
import { TabOrder } from ".";
import "@/style/global.css";

describe("<TabOrder />", () => {
  it("should render TabOrder", () => {
    cy.mount(
      <TabOrder
        onChange={() => {}}
        orderStatus={OrderStatus.IN_PROGRESS}
        confirmedLength={1}
        deliveredLength={1}
        deliveringLength={1}
      />
    );

    cy.get("[data-cy=tab-order]").should("be.visible");
  });

  it("should render TabOrder with grid on container", () => {
    cy.mount(
      <TabOrder
        onChange={() => {}}
        orderStatus={OrderStatus.IN_PROGRESS}
        confirmedLength={1}
        deliveredLength={1}
        deliveringLength={1}
      />
    );

    cy.get("[data-cy=tab-order]").should("be.visible");
    cy.get("[data-cy=tab-order]").should("have.css", "display", "grid");
  });

  it("should render order confirmed selected", () => {
    cy.mount(
      <TabOrder
        onChange={() => {}}
        orderStatus={OrderStatus.IN_PROGRESS}
        confirmedLength={1}
        deliveredLength={1}
        deliveringLength={1}
      />
    );

    cy.get("[data-cy=tab-order]").should("be.visible");
    cy.get("[data-cy=tab-order-confirmed]")
      .should("be.visible")
      .should("have.css", "background-color", "rgb(255, 255, 255)");
  });

  it("should render order delivering selected", () => {
    cy.mount(
      <TabOrder
        onChange={() => {}}
        orderStatus={OrderStatus.DELIVERING}
        confirmedLength={1}
        deliveredLength={1}
        deliveringLength={1}
      />
    );

    cy.get("[data-cy=tab-order]").should("be.visible");
    cy.get("[data-cy=tab-order-delivering]")
      .should("be.visible")
      .should("have.css", "background-color", "rgb(255, 255, 255)");
  });

  it("should render order delivered selected", () => {
    cy.mount(
      <TabOrder
        onChange={() => {}}
        orderStatus={OrderStatus.DELIVERED}
        confirmedLength={1}
        deliveredLength={1}
        deliveringLength={1}
      />
    );

    cy.get("[data-cy=tab-order]").should("be.visible");
    cy.get("[data-cy=tab-order-delivered]")
      .should("be.visible")
      .should("have.css", "background-color", "rgb(255, 255, 255)");
  });

  it("should verify length value", () => {
    cy.mount(
      <TabOrder
        onChange={() => {}}
        orderStatus={OrderStatus.DELIVERED}
        confirmedLength={10}
        deliveringLength={15}
        deliveredLength={20}
      />
    );

    cy.get("[data-cy=confirmed-length]").should("have.text", "10");
    cy.get("[data-cy=delivering-length]").should("have.text", "15");
    cy.get("[data-cy=delivered-length]").should("have.text", "20");
  });

  it("should call onChange function", () => {
    const fuc = {
      call(_orderStatus: OrderStatus) {},
    };

    cy.spy(fuc, "call").as("onChange");

    cy.mount(
      <TabOrder
        onChange={fuc.call}
        orderStatus={OrderStatus.DELIVERED}
        confirmedLength={1}
        deliveredLength={1}
        deliveringLength={1}
      />
    );

    cy.get("[data-cy=tab-order]").should("be.visible");
    cy.get("[data-cy=tab-order-delivered]").click();
    cy.get("@onChange").should("have.been.called");
  });
});
