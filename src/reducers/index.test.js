import reducer from "./index";
import { initState } from "../__mocks__/reducers";

describe("reducers/index", () => {
  it("returns the initial state if not provided", () => {
    expect(reducer(undefined, {})).toEqual(initState);
  });

  it("returns the previous state if an unknown action is passed", () => {
    expect(reducer(initState, { type: "@@UNKNOWN" })).toBe(initState);
  });
});
