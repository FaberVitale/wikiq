//@flow
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

/* applies overlay effect to the closest anchestor 
 * that creates a stacking context
 * https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
 */
const style = theme => ({
  overlay: {
    content: '""',
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

class OverflowFade extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return <div className={classes.overlay} {...rest} aria-hidden="true" />;
  }
}

export default withStyles(style)(OverflowFade);
