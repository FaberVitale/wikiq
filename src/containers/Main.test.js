import React from "react";
import ReactDOM from "react-dom";
import Main from "./Main";
import withMemoryRouter from "../__mocks__/withMemoryRouter";

describe("src/components/AppBar", () => {
  const WrappedMain = withMemoryRouter(Main);

  it("renders without crashing", done => {
    const div = document.createElement("div");
    const Home = WrappedMain();
    const SearchResult = WrappedMain(["en/rem"]);

    const cleanUp = () => {
      ReactDOM.unmountComponentAtNode(div);
      done();
    };

    ReactDOM.render(
      <div>
        <Home />
        <SearchResult />
      </div>,
      div,
      cleanUp
    );
  });
});
