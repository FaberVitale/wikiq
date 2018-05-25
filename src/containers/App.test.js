import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import configureStore from "../configureStore";

it("renders without crashing", done => {
  const div = document.createElement("div");
  const store = configureStore();

  const cleanUp = () => {
    ReactDOM.unmountComponentAtNode(div);
    done();
  };

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div,
    cleanUp
  );
});
