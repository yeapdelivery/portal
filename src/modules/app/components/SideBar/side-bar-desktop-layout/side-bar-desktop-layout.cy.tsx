import "@/style/global.css";
import SideBarDesktopLayout from "./side-bar-desktop-layout";
import { Menu, menus } from "..";

describe("<SideBarDesktopLayout />", () => {
  it("should render SideBarDesktopLayout", () => {
    cy.mount(
      <SideBarDesktopLayout
        activeMenu={Menu.ORDER}
        handleMenuClick={() => {}}
        menus={menus}
        open={true}
        setOpen={() => {}}
        stateMenu="open"
      />
    );

    cy.get("[data-cy=container-side-bar-desktop]").should("exist");
  });

  it("should signOut", () => {
    cy.mount(
      <SideBarDesktopLayout
        activeMenu={Menu.ORDER}
        handleMenuClick={() => {}}
        menus={menus}
        open={true}
        setOpen={() => {}}
        stateMenu="open"
      />
    );

    cy.get("[data-cy=sign-out]")
      .should("exist")
      .should("have.attr", "href", "/api/auth/logout");
  });

  it("should verify close", () => {
    cy.mount(
      <SideBarDesktopLayout
        activeMenu={Menu.ORDER}
        handleMenuClick={() => {}}
        menus={menus}
        open={false}
        setOpen={() => {}}
        stateMenu="closed"
      />
    );

    cy.get("[data-cy=container-side-bar-desktop]").should(
      "have.class",
      "data-[state=closed]:w-16"
    );
  });

  it("should verify open", () => {
    cy.mount(
      <SideBarDesktopLayout
        activeMenu={Menu.ORDER}
        handleMenuClick={() => {}}
        menus={menus}
        open={false}
        setOpen={() => {}}
        stateMenu="closed"
      />
    );

    cy.get("[data-cy=container-side-bar-desktop]").should("have.class", "w-56");
  });
});
