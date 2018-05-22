//@flow
import * as React from "react";
import throttle from "lodash.throttle";
import debounce from "lodash.debounce";
import { computeChangedBitsFactory } from "../util/functions";
import { $html } from "../util/dom";
import { SCROLL_THROTTLE, SCROLL_DEBOUNCE } from "../config";
import type { ComputeChangedBits } from "../util/functions";

type Scroll = {
  +scrollX: number,
  +scrollY: number,
  +isScrolling: boolean
};

export const bitmask = {
  ALL: 7,
  SCROLL_X: 1,
  SCROLL_Y: 2,
  IS_SCROLLING: 4
};

Object.freeze(bitmask);

/* Default context value: Consumers will return this value if 
 * Provider isn't an anchestor of Consumer or if window is not defined
 */
export const defaultScroll: Scroll = {
  scrollX: -1,
  scrollY: -1,
  isScrolling: false
};

Object.freeze(defaultScroll);

const computeChangedBits: ComputeChangedBits<
  Scroll
> = computeChangedBitsFactory(["scrollX", "scrollY", "isScrolling"]);

// $FlowFixMe - Flow( flow-bin 0.72.0) hasnt updated the definitions of React
const { Provider, Consumer } = React.createContext(
  defaultScroll,
  computeChangedBits
);

export const ScrollConsumer = Consumer;

const getScroll: () => Scroll = () => {
  if (!$html || typeof window === "undefined") {
    return defaultScroll;
  }

  let { pageYOffset, pageXOffset } = window;

  /* see: https://github.com/ReactTraining/react-router/issues/605  */
  return {
    scrollX: typeof pageXOffset === "number" ? pageXOffset : $html.scrollLeft,
    scrollY: typeof pageYOffset === "number" ? pageYOffset : $html.scrollTop
  };
};

/* Component that holds the context, 
 * it uses a throttled scroll listener to triggers
 * updates of context
 */
export const ScrollProvider = class ScrollProvider extends React.Component<
  { children: React.Node },
  { context: Scroll }
> {
  state = { context: { ...getScroll(), isScrolling: false } };

  static defaultProps = {
    children: null
  };

  scrollEnd: () => void = debounce(
    () => {
      if (this.state.context.isScrolling) {
        this.setState(({ context }: Scroll) => ({
          context: {
            ...context,
            isScrolling: false
          }
        }));
      }
    },
    SCROLL_DEBOUNCE,
    { leading: false }
  );

  updateScrollIfNecessary: () => void = throttle(() => {
    const nextScroll = { ...getScroll(), isScrolling: true };

    /* Update only if and only if a property has changed:
     * this new context api uses reference equality to check if
     * Consumers should re-render
     */
    if (computeChangedBits(this.state.context, nextScroll) > 0) {
      this.setState({ context: nextScroll });
    }
  }, SCROLL_THROTTLE);

  componentDidMount() {
    window.addEventListener("scroll", this.updateScrollIfNecessary);
  }

  componentDidUpdate(_: {}, { context }: prevState) {
    if (context.isScrolling) {
      this.scrollEnd();
    }
  }

  //clean up
  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateScrollIfNecessary);
  }

  render() {
    return (
      <Provider value={this.state.context}>{this.props.children}</Provider>
    );
  }
};
