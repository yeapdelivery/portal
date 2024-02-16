import "@/style/global.css";
import Dropzone from ".";
import { DropFiles } from "./types";

const files: DropFiles[] = [
  {
    id: "1",
    base64: "",
    src: "",
    name: "file1",
    size: 100,
    type: "image/png",
  },
  {
    id: "2",
    base64: "",
    src: "",
    name: "file2",
    size: 200,
    type: "image/png",
  },
];

describe("<Dropzone />", () => {
  it("should render Dropzone", () => {
    cy.mount(<Dropzone files={[]} onDrop={() => {}} onDelete={() => {}} />);

    cy.get("[data-test=dropzone]").should("exist");
  });

  it("should render files", () => {
    cy.mount(<Dropzone files={files} onDrop={() => {}} onDelete={() => {}} />);

    cy.get("[data-test=dropzone]").should("exist");
    cy.contains("file1").should("exist");
    cy.contains("file2").should("exist");
  });

  it("should call onDrop", () => {
    const fuc = {
      call() {},
    };

    cy.spy(fuc, "call").as("onDrop");

    cy.mount(<Dropzone files={files} onDrop={fuc.call} onDelete={() => {}} />);

    cy.get("input[type=file]").selectFile({
      contents: Cypress.Buffer.from("file content"),
      fileName: "file1",
      mimeType: "image/png",
    });

    cy.get("@onDrop").should("have.been.called");
  });

  it("should render on delete", () => {
    const fuc = {
      call() {},
    };

    cy.spy(fuc, "call").as("delete");

    cy.mount(<Dropzone files={files} onDrop={fuc.call} onDelete={fuc.call} />);

    cy.get("[data-test=delete-1]").click();
    cy.get("@delete").should("have.been.called");
  });

  it("should call onDelete", () => {
    const fuc = {
      call() {},
    };

    cy.spy(fuc, "call").as("delete");

    cy.mount(<Dropzone files={files} onDrop={fuc.call} onDelete={fuc.call} />);

    cy.get("[data-test=delete-1]").click();
    cy.get("@delete").should("have.been.called");
  });

  it("should verify wrong type", () => {
    cy.mount(
      <Dropzone
        accept={["image/png"]}
        files={files}
        onDrop={() => {}}
        onDelete={() => {}}
      />
    );

    cy.get("input[type=file]").selectFile({
      contents: Cypress.Buffer.from("file content"),
      fileName: "file1",
      mimeType: "image/jpeg",
    });

    cy.get("[data-test=toast-container]").should("be.visible");
  });
});
