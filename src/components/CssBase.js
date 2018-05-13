//@flow
import React from "react";
import withStyles from "material-ui/styles/withStyles";
import { REACT_ROOT_ID, APPBAR_MIN_HEIGHT } from "../config";

type Props = {||};
/*inspired by Mui's CssBaseline (previously named Reboot):
 https://github.com/mui-org/material-ui/blob/v1-beta/src/CssBaseline/CssBaseline.js
 it adds touch action and changes marging and padding rules
 */
const styles = theme => ({
  "@global": {
    html: {
      // Antialiasing.
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale"
    },
    "*, *::before, *::after": {
      // width/height = border + padding +  content
      boxSizing: "border-box",
      //remove default padding and margin
      margin: 0,
      padding: 0
    },
    body: {
      //stretch to cover the whole viewport
      width: "100vw",
      height: "100vh",
      //removes horizontal scrollbar if verticla scrollbar pops up
      maxWidth: "100%",
      //removes double-tap to zoom, allows  pan or pinch to zoom
      touchAction: "manipulation",
      fontFamily: '"Roboto"',
      // MUI Grid container makes the horizontal scrollbar pop up
      overflowX: "auto",
      backgroundColor: theme.palette.background.default,
      "@media print": {
        // Save printer ink.
        backgroundColor: theme.palette.common.white
      }
    },
    [`#${REACT_ROOT_ID}`]: {
      //the root of the react Dom has the same viewport of body
      width: "100%",
      height: "100%",
      // set root id as the stacking context
      position: "relative",
      // display children non removed from the flow below the appBar
      paddingTop: APPBAR_MIN_HEIGHT
    },
    /* hide chrome and ie11 clear button */
    'input[type="search"]::-webkit-search-cancel-button': {
      "-webkit-appearance": "none"
    },
    'input[type="search"]::-ms-clear': {
      display: "none"
    }
  }
});

class CssBase extends React.Component<Props> {
  shouldComponentUpdate() {
    return false;
  }
  render() {
    return null;
  }
}

export default withStyles(styles)(CssBase);
