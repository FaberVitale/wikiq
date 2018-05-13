import { default as reducer } from "./theme";
import * as actionTypes from "../action/types";
import { initState } from "../__mocks__/reducers";
import { getTheme } from "../selectors";

describe("reducers/index", () => {
  const initTheme = getTheme(initState);
  const changeThemeAction = { type: actionTypes.CHANGE_THEME };

  it("returns the initial state", () => {
    expect(reducer(undefined, {})).toBe(initTheme);
  });

  it("toggles theme if CHANGE_THEME action is passed", () => {
    const nextState = reducer(initTheme, changeThemeAction);

    expect(nextState).toBe("dark");
    expect(reducer(nextState, changeThemeAction)).toBe(initTheme);
  });
});
