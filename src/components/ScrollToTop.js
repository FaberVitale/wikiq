//@flow
import React from "react";
import withRouter from "react-router-dom/withRouter";
import type { Location } from "react-router-dom";
import { ScrollConsumer, bitmask as scrollMask } from "../containers/Scroll";
import type { Scroll } from "../containers/Scroll";

type Props = {
  location: Location,
  scrollTo: (xOrOptions: number | {}, y?: number) => void,
  scrollY: number
};

/* components that scrolls to (0,0) on location.pathname change
 * if scrollY > 0 */
class ScrollToTop extends React.Component<Props> {
  componentDidUpdate(prevProps: Props) {
    if (
      prevProps.location.pathname !== this.props.location.pathname &&
      this.props.scrollY > 0
    ) {
      this.props.scrollTo(0, 0);
    }
  }

  render() {
    return null;
  }
}

export default withRouter(props => (
  <ScrollConsumer unstable_observedBits={scrollMask.SCROLL_Y}>
    {({ scrollY }: Scroll) => <ScrollToTop scrollY={scrollY} {...props} />}
  </ScrollConsumer>
));
