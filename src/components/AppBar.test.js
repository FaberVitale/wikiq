import React from "react";
import ReactDOM from "react-dom";
import AppBar from "./AppBar";
import MemoryRouter from "react-router-dom/MemoryRouter";

describe("src/components/AppBar", () => {
  it("renders without crashing", done => {
    const div = document.createElement("div");

    const cleanUp = () => {
      ReactDOM.unmountComponentAtNode(div);
      done();
    };

    ReactDOM.render(
      <MemoryRouter initialEntries={["/"]} initialIndex={0}>
        <AppBar toggleTheme={() => {}} bulbLit={true} />
      </MemoryRouter>,
      div,
      cleanUp
    );
  });
});
