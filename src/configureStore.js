//@flow
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "./reducers";
import thunk from "redux-thunk";

export default function configureStore() {
  const middleware = applyMiddleware(thunk);

  const composeEnhancers =
    process.env.NODE_ENV !== "production" &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === "function"
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      : compose;

  return createStore(reducer, composeEnhancers(middleware));
}
