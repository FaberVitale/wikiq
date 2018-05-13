//@flow
import * as React from "react";
import { getDisplayName } from "../util/functions";
import throttle from "lodash.throttle";
import { SCROLL_LISTENER_THROTTLE } from "../config";

/* shape of context
 * bit order(ascending): pageXOffset, pageYOffset, innerWidth, innerHeight 
*/
type Context = {|
  +pageXOffset: number,
  +pageYOffset: number,
  +innerWidth: number,
  +innerHeight: number
|};

const defaultContext: Context = {
  pageYOffset: -1,
  pageXOffset: -1,
  innerWidth: -1,
  innerHeight: -1
};

Object.freeze(defaultContext);

const keys = ["pageXOffset", "pageYOffset", "innerWidth", "innerHeight"];

const computeChangedBits: (prev: Context, next: Context) => number = (
  prev,
  next
) => {
  let res = 0;

  for (
    let i = 0, key = keys[i], len = keys.length;
    i < len;
    i++, key = keys[i]
  ) {
    if (prev[key] !== next[key]) {
      res |= i;
    }
  }

  return res;
};

type ProviderState = {| context: Context |};
type ProviderProps = { children: React.Node };

// $FlowFixMe - Flow( flow-bin 0.71.0) hasnt updated the definitions of React
const { Provider, Consumer } = React.createContext(
  defaultContext,
  computeChangedBits
);

export const ScrollListenerProvider = class ScrollListenerProvider extends React.Component<
  ProviderProps,
  ProviderState
> {
  static defaultProps: ProviderProps = {
    children: null
  };

  static getContext: () => Context = () => {
    if (typeof window !== "undefined") {
      return {
        pageYOffset: window.pageYOffset,
        pageXOffset: window.pageXOffset,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight
      };
    } else {
      return defaultContext;
    }
  };

  constructor(props: ProviderProps) {
    super(props);

    this.state = {
      context: ScrollListenerProvider.getContext()
    };
  }

  updateContextIfNecessary = throttle(
    () => {
      const currentContext: Context = this.state.context;
      const nextContext: Context = ScrollListenerProvider.getContext();

      const changedBits = computeChangedBits(currentContext, nextContext);

      if (changedBits > 0) {
        this.setState({
          context: nextContext
        });
      }
    },
    SCROLL_LISTENER_THROTTLE,
    { leading: true, trailing: true }
  );

  componentDidMount() {
    window.addEventListener("scroll", this.updateContextIfNecessary);
    window.addEventListener("resize", this.updateContextIfNecessary);
  }
  //clean up
  componentWillUnmount() {
    window.removeEventListener("scroll", this.updateContextIfNecessary);
    window.removeEventListener("resize", this.updateContextIfNecessary);
  }

  render() {
    return (
      <Provider value={this.state.context}>{this.props.children}</Provider>
    );
  }
};

export const ScrollListenerConsumer = Consumer;

type State = {
  subscribed: boolean
};

const toggleHOCState = ({ subscribed }: State) => {
  return {
    subscribed: !subscribed
  };
};

export const withScrollListener = (Comp: React.ComponentType<*>) => {
  class ScrollListener extends React.Component<{}, State> {
    state = {
      subscribed: true
    };

    _lastContext: Context = defaultContext;

    toggleSubscription = () => {
      this.setState(toggleHOCState);
    };

    static displayName = getDisplayName(ScrollListener.name, Comp);

    renderProp = (context: Context) => {
      this._lastContext = context;
      // in a name conflict context and state have precedence
      return React.createElement(Comp, {
        ...this.props,
        ...context,
        subscribed: this.state.subscribed,
        toggleSubscription: this.toggleSubscription
      });
    };

    render() {
      const bitmask = this.state.subscribed ? 15 : 0;

      return (
        <Consumer unstable_observedBits={bitmask}>{this.renderProp}</Consumer>
      );
    }
  }

  return ScrollListener;
};
