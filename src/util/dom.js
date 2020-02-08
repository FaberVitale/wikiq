//@flow
import { noop } from "./functions";

const environmentHasWindow = typeof window !== "undefined";

/* https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement
 * it can be null on server or if, somehow, the html page is empty
 * document.documentElement is read-only
 */

export const $html: Element | null =
  environmentHasWindow && window.document
    ? window.document.documentElement
    : null;

export const scrollTo =
  environmentHasWindow && typeof window.scrollTo === "function"
    ? window.scrollTo.bind(window)
    : noop;

export const $localStorage: Storage | null =
  typeof window !== "undefined" &&
  window.localStorage &&
  typeof window.localStorage.getItem === "function" &&
  typeof window.localStorage.setItem === "function"
    ? window.localStorage
    : null;
