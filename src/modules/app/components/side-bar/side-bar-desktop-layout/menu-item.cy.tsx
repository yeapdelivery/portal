import "@/style/global.css";
import { MenuItem } from "./menu-item";
import { Menu, menus } from "..";

describe("<MenuItem />", () => {
  it("should render MenuItem", () => {
    const menu = menus[1];

    cy.mount(
      <MenuItem
        activeMenu={Menu.ORDER}
        handleMenuClick={() => {}}
        menu={menus[1]}
        stateMenu="open"
      />
    );

    cy.get(`[data-cy=${menu.name}]`).should("exist");
  });

  it("should render active MenuItem", () => {
    const menu = menus[0];

    cy.mount(
      <MenuItem
        activeMenu={Menu.ORDER}
        handleMenuClick={() => {}}
        menu={menu}
        stateMenu="open"
      />
    );

    cy.get(`[data-cy=${menu.name}]`)
      .children()
      .should("exist")
      .should(
        "have.class",
        "text-white bg-primary-default h-8 rounded hover:text-white"
      )
      .should("have.attr", "href", menu.href);
  });

  it("should subItems content", () => {
    const menu = menus[3];

    cy.mount(
      <MenuItem
        activeMenu={Menu.ORDER}
        handleMenuClick={() => {}}
        menu={menu}
        stateMenu="open"
      />
    );

    cy.get("[data-cy=sub-item]").first().should("exist").click();

    cy.get("[data-cy=sub-items-content]").should("exist");
  });

  it("should subItems content preferences company active", () => {
    const menu = menus[3];

    cy.mount(
      <MenuItem
        activeMenu={Menu.PREFERENCES_COMPANY}
        handleMenuClick={() => {}}
        menu={menu}
        stateMenu="open"
      />
    );

    cy.get(`[data-cy=${Menu.PREFERENCES_COMPANY}]`)
      .should("exist")
      .should("have.class", "text-primary-default bg-primary-lighter");

    cy.get("[data-cy=sub-item]")
      .first()
      .children()
      .should(
        "have.class",
        "text-white bg-primary-default h-8 rounded hover:text-white"
      );
  });

  it("should subItems content user active", () => {
    const menu = menus[3];

    cy.mount(
      <MenuItem
        activeMenu={Menu.PREFERENCES_USER}
        handleMenuClick={() => {}}
        menu={menu}
        stateMenu="open"
      />
    );

    cy.get(`[data-cy=${Menu.PREFERENCES_USER}]`)
      .should("exist")
      .should("have.class", "text-primary-default bg-primary-lighter");

    cy.get("[data-cy=sub-item]")
      .first()
      .children()
      .should(
        "have.class",
        "text-white bg-primary-default h-8 rounded hover:text-white"
      );
  });
});
