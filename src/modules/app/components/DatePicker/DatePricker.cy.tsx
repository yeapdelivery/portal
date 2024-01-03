import "@/style/global.css";
import { DatePicker } from ".";
import { format, compareAsc } from "date-fns";

describe("<DatePicker />", () => {
  it("should render DatePicker", () => {
    cy.mount(<DatePicker />);

    cy.get("[data-cy-root]").should("exist");
  });

  it("should render open DatePicker", () => {
    cy.mount(<DatePicker />);

    cy.get("[data-cy-root]").should("exist").click(20, 20);
    cy.get(".react-datepicker-popper").should("exist");
  });

  it("should render open DatePicker", () => {
    cy.mount(<DatePicker />);

    cy.get("[data-cy-root]").should("exist").click(20, 20);
    cy.get(".react-datepicker-popper").should("exist");
  });

  it("should render open after close DatePicker", () => {
    cy.mount(<DatePicker />);

    cy.get("[data-cy-root]").should("exist").click(20, 20);
    cy.get(".react-datepicker-popper").should("exist");

    cy.get("body").should("exist").click("bottom");
    cy.get(".react-datepicker-popper").should("not.exist");
  });

  it("should verify value on input DatePicker", () => {
    cy.mount(<DatePicker />);

    cy.get("input").should("have.value", format(new Date(), "dd/MM/yyyy"));
  });

  it("should set value on input DatePicker", () => {
    cy.mount(
      <DatePicker
        maxDate={new Date()}
        onChange={(date) => {
          cy.get("input").should("have.value", format(date, "dd/MM/yyyy"));
        }}
      />
    );
    const yesterday = new Date().getDay() - 1;

    cy.get("[data-cy-root]").should("exist").click(20, 20);
    cy.get(`.react-datepicker__day--${yesterday.toString().padStart(3, "0")}`)
      .not(".react-datepicker__day--disabled")
      .first()
      .click();
  });

  it("should verify rotate arrow animation DatePicker", () => {
    cy.mount(<DatePicker />);
    const yesterday = new Date().getDay() - 1;

    cy.get("[data-cy-root]").should("exist").click(20, 20);
    cy.get("[data-cy=arrow-date-picker]")
      .should("exist")
      .should("have.css", "transform");
  });

  it("should render open when arrow icon was clicked DatePicker", () => {
    cy.mount(<DatePicker />);

    cy.get("[data-cy=arrow-date-picker]").should("exist").click();
    cy.get(".react-datepicker-popper").should("exist");
  });

  it("should render open when calendar icon was clicked DatePicker", () => {
    cy.mount(<DatePicker />);

    cy.get("[data-cy=calendar-date-picker]").should("exist").click();
    cy.get(".react-datepicker-popper").should("exist");
  });
});
