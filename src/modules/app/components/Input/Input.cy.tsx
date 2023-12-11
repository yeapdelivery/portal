import { Input } from ".";
import "@/style/global.css";

describe("<Filed />", () => {
  it("should render Filed", () => {
    cy.mount(<Input />);

    cy.get("input").should("be.visible");
  });
});
