//@flow
import { createStore, applyMiddleware } from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";

const configureStore = (function buildConfigureStore() {
  const middleware = applyMiddleware(thunk);

  if (process.env.NODE_ENV === "production") {
    return () => createStore(reducer, middleware);
  }

  const reduxDevTool: Function | void =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

  return () => createStore(reducer, reduxDevTool, middleware);
})();

export default configureStore;
