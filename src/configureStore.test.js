import configureStore from "./configureStore";
import { initState } from "./fixtures/reducers";

describe("src/configureStore", () => {
  const isAReduxStore = (store) => {
    return (
      !!store &&
      typeof store === "object" &&
      typeof store.dispatch === "function" &&
      typeof store.getState === "function" &&
      typeof store.subscribe === "function"
    );
  };

  it("is a function that returns a redux store", () => {
    expect(typeof configureStore).toBe("function");

    expect(isAReduxStore(configureStore())).toBe(true);
  });

  it("returns the initial state of the application", () => {
    expect(configureStore().getState()).toEqual(initState);
  });

  it("is idempotent", () => {
    const stores = new Array(4).map(configureStore);

    expect(stores.every(isAReduxStore)).toBe(true);

    stores.forEach((store) => {
      expect(store.getState()).toEqual(initState);
    });
  });
});
