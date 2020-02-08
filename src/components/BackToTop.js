//@flow
import React from "react";
import Button from "@material-ui/core/Button";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Zoom from "@material-ui/core/Zoom";

type Props = {
  scrollY: number,
  threshold: number,
  scrollTo: (...args: Array<mixed>) => void
};

/* Simple Back to Top button that is visible when window.scrollY
 * is higher than BACK_TO_TOP_THRESHOLD */
class BackToTop extends React.Component<Props> {
  static style = {
    zoom: {
      position: "fixed",
      bottom: 10,
      right: 10,
      zIndex: 500
    }
  };

  static isIn = (offset: number, threshold: number) => {
    return offset >= threshold;
  };

  handleClick = (evt: mixed) => {
    this.props.scrollTo(0, 0);
  };

  shouldComponentUpdate({ scrollY, threshold, scrollTo }: Props) {
    return (
      BackToTop.isIn(scrollY, threshold) !==
        BackToTop.isIn(this.props.scrollY, this.props.threshold) ||
      this.props.scrollTo !== scrollTo
    );
  }

  render() {
    const isIn = BackToTop.isIn(this.props.scrollY, this.props.threshold);

    return (
      <Zoom timeout={300} style={BackToTop.style.zoom} in={isIn}>
        <Button
          aria-hidden={!isIn}
          aria-label="scroll to top"
          onClick={this.handleClick}
          variant="fab"
          mini
          color="primary"
        >
          <ExpandLess nativeColor="#ffffff" />
        </Button>
      </Zoom>
    );
  }
}

export default BackToTop;
