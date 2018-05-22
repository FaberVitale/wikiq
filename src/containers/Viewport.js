//@flow
import * as React from "react";
import debounce from "lodash.debounce";
import { computeChangedBitsFactory } from "../util/functions";
import { VIEWPORT__DEBOUNCE_TIME } from "../config";
import type { ComputeChangedBits } from "../util/functions";
import { $html } from "../util/dom";

export type Viewport = {
  +viewportWidth: number,
  +viewportHeight: number
};

export const bitmask = {
  ALL: 7,
  VIEWPORT_WIDTH: 1,
  VIEWPORT_HEIGHT: 2
};

Object.freeze(bitmask);

/* Default context value: Consumers will return this value if 
 * Provider isn't an anchestor of Consumer or if window or 
 * window.document.documentElement is not defined
 */
export const defaultViewport: Viewport = {
  viewportWidth: -1,
  viewportHeight: -1
};

Object.freeze(defaultViewport);

const computeChangedBits: ComputeChangedBits<
  Viewport
> = computeChangedBitsFactory(["viewportWidth", "viewportHeight"]);

// $FlowFixMe - Flow( flow-bin 0.72.0) hasnt updated the definitions of React
const { Provider, Consumer } = React.createContext(
  defaultViewport,
  computeChangedBits
);

export const ViewportConsumer = Consumer;

const getViewport: () => Viewport = () => {
  if (!$html) {
    return defaultViewport;
  }

  return {
    viewportWidth: $html.clientWidth,
    viewportHeight: $html.clientHeight
  };
};

/* Component that holds the context, 
 * it uses a throttled  listener to triggers
 * updates of context on resize and on orientationchange
 */
export const ViewportProvider = class ScrollProvider extends React.Component<
  { children: React.Node },
  { context: Viewport }
> {
  state = { context: getViewport() };

  static defaultProps = {
    children: null
  };

  updateViewportIfNecessary: () => void = debounce(
    () => {
      const nextViewport = getViewport();

      /* Update only if and only if a property has changed:
     * this new context api uses reference equality to check if
     * Consumers should re-render
     */
      if (computeChangedBits(this.state.context, nextViewport) > 0) {
        this.setState({ context: nextViewport });
      }
    },
    VIEWPORT__DEBOUNCE_TIME,
    { leading: false }
  );

  componentDidMount() {
    window.addEventListener("resize", this.updateViewportIfNecessary);
    window.addEventListener(
      "orientationchange",
      this.updateViewportIfNecessary
    );
  }
  //clean up
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateViewportIfNecessary);
    window.removeEventListener(
      "orientationchange",
      this.updateViewportIfNecessary
    );
  }

  render() {
    return (
      <Provider value={this.state.context}>{this.props.children}</Provider>
    );
  }
};
