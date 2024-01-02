import "@/style/global.css";
import { HourHeader, getHourAndMinutes } from "./HourHeader";

describe("<MenuItem />", () => {
  it("should render MenuItem", () => {
    cy.mount(<HourHeader />);

    cy.get("[data-cy=hour-header]").should("exist");
  });

  it("should render with correct hour", () => {
    cy.mount(<HourHeader />);

    const label = getHourAndMinutes();

    cy.get("[data-cy=hour-header]").should("exist").should("have.text", label);
  });
});
