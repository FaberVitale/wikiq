//@flow
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

/* applies overlay effect to the closest anchestor 
 * that creates a stacking context (e.g. position: relative)
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
 * 
 * Props:
 *  - className
 *  - style
 *  - other undocumented props are applied to the root element
 */
const style = theme => ({
  overlay: {
    display: "block",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 5,
    width: "100%",
    height: "100%",
    background: `linear-gradient(to bottom,transparent 65%, ${
      theme.palette.background.paper
    })`
  }
});

type Props = {
  classes: MUIClasses,
  className: string
};

class OverflowFade extends React.Component<Props> {
  render() {
    const { classes, className, ...rest } = this.props;

    let rootClass = classes.overlay;

    if (className) {
      rootClass += "\u0020" + className;
    }

    return <div className={rootClass} {...rest} aria-hidden="true" />;
  }
}

export default withStyles(style)(OverflowFade);
