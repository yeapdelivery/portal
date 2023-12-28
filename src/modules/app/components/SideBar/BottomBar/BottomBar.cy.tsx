import "@/style/global.css";
import BottomBar from "./BottomBar";
import { Menu, menus } from "../";

describe("<BottomBar />", () => {
  it("should render BottomBar", () => {
    cy.mount(
      <BottomBar
        activeMenu={Menu.ORDER}
        handleMenuClick={() => {}}
        menus={menus}
      />
    );

    cy.get("[data-cy=container-bottom]").should("exist");
  });

  it("should verify active button", () => {
    cy.mount(
      <BottomBar
        activeMenu={Menu.ORDER}
        handleMenuClick={() => {}}
        menus={menus}
      />
    );

    const getMenu = menus.find((menu) => menu.name === Menu.ORDER);

    cy.get(`[data-cy=${Menu.ORDER}]`)
      .should("exist")
      .should(
        "have.class",
        "bg-red-default text-white rounded-lg p-2 hover:text-white"
      )
      .children()
      .should("have.attr", "href", getMenu?.href);
  });

  it("should signOut", () => {
    cy.mount(
      <BottomBar
        activeMenu={Menu.ORDER}
        handleMenuClick={() => {}}
        menus={menus}
      />
    );

    cy.get("[data-cy=sign-out]")
      .should("exist")
      .should("have.attr", "href", "/api/auth/logout");
  });

  it("should show sub menus options", () => {
    cy.mount(
      <BottomBar
        activeMenu={Menu.ORDER}
        handleMenuClick={() => {}}
        menus={menus}
      />
    );

    cy.get("[data-cy=sub-menu]").first().should("exist").click();

    cy.get("[data-cy=sub-menu-content]").should("exist");
  });

  it("should show sub menus active preferences company", () => {
    cy.mount(
      <BottomBar
        activeMenu={Menu.PREFERENCES_COMPANY}
        handleMenuClick={() => {}}
        menus={menus}
      />
    );

    cy.get("[data-cy=sub-menu]").first().should("exist").click();
    cy.get(`[data-cy=${Menu.PREFERENCES_COMPANY}]`)
      .should("exist")
      .should("have.class", "text-red-default bg-red-primary-lighter");
    cy.get("[data-cy=sub-menu]")
      .first()
      .children()
      .should(
        "have.class",
        "bg-red-default text-white rounded-lg p-2 hover:text-white"
      );
  });

  it("should show sub menus active preferences company", () => {
    cy.mount(
      <BottomBar
        activeMenu={Menu.PREFERENCES_USER}
        handleMenuClick={() => {}}
        menus={menus}
      />
    );

    cy.get("[data-cy=sub-menu]").first().should("exist").click();
    cy.get(`[data-cy=${Menu.PREFERENCES_USER}]`)
      .should("exist")
      .should("have.class", "text-red-default bg-red-primary-lighter");
    cy.get("[data-cy=sub-menu]")
      .first()
      .children()
      .should(
        "have.class",
        "bg-red-default text-white rounded-lg p-2 hover:text-white"
      );
  });
});
