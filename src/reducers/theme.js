//@flow
import { CHANGE_THEME } from "../action/types";
import type { Action } from "../action/types";

export type State = "light" | "dark";

const initState: State = "light";

export default (state: State = initState, action: Action) => {
  if (action.type === CHANGE_THEME) {
    return state === "light" ? "dark" : "light";
  }
  return state;
};
