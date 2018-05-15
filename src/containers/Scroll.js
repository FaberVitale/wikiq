//@flow
import * as React from "react";
import throttle from "lodash.throttle";
import { getDisplayName, computeChangedBitsFactory } from "../util/functions";
import { $html } from "../util/dom";
import { SCROLL_LISTENER_THROTTLE } from "../config";
import type { ComputeChangedBits } from "../util/functions";

type Scroll = {
  +scrollX: number,
  +scrollY: number
};

const ALL_PROP_BITMASK = 3;

/* Default context value: Consumers will return this value if 
 * Provider isn't an anchestor of Consumer or if window is not defined
 */
export const defaultScroll: Scroll = {
  scrollX: -1,
  scrollY: -1
};

Object.freeze(defaultScroll);

const computeChangedBits: ComputeChangedBits<
  Scroll
> = computeChangedBitsFactory(["scrollX", "scrollY"]);

// $FlowFixMe - Flow( flow-bin 0.72.0) hasnt updated the definitions of React
const { Provider, Consumer } = React.createContext(
  defaultScroll,
  computeChangedBits
);

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
  state = { context: getScroll() };

  static defaultProps = {
    children: null
  };

  updateScrollIfNecessary: () => void = throttle(() => {
    const nextScroll = getScroll();

    /* Update only if and only if a property has changed:
     * this new context api uses reference equality to check if
     * Consumers should re-render
     */
    if (computeChangedBits(this.state.context, nextScroll) > 0) {
      this.setState({ context: nextScroll });
    }
  }, SCROLL_LISTENER_THROTTLE);

  componentDidMount() {
    window.addEventListener("scroll", this.updateScrollIfNecessary);
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

/* Consumer exported wrapped in a HOC */
export const withScroll = (Comp: React.ComponentType<*>) => {
  class ScrollHOC extends React.Component<{}> {
    static displayName = getDisplayName(ScrollHOC.name, Comp);

    renderProp: (value: Scroll) => React.Element<typeof Comp> = value => {
      return React.createElement(Comp, {
        ...this.props,
        ...value
      });
    };

    render() {
      return (
        <Consumer unstable_observedBits={ALL_PROP_BITMASK}>
          {this.renderProp}
        </Consumer>
      );
    }
  }

  return ScrollHOC;
};
