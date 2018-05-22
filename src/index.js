//@flow
import React from "react";
import ReactDOM from "react-dom";
import App from "./containers/App";
import registerServiceWorker from "./registerServiceWorker";
import { REACT_ROOT_ID } from "./config";
import { Provider } from "react-redux";
import configureStore from "./configureStore";
import "./fonts/roboto-typeface.css";

const root = document.getElementById(REACT_ROOT_ID);

if (root !== null) {
  const store = configureStore();

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    root
  );
  registerServiceWorker();
} else {
  console.error("root element is missing!");
}
