//@flow
import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";
import { contrastText } from "../theme";

const styles = {
  svg: {
    fill: contrastText,
  },
};

type Props = {
  handleClick: () => void,
  classes: MUIClasses,
  lit: boolean,
};

const bulb = {
  empty:
    "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 " +
    "9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 " +
    "1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 " +
    "11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 " +
    "9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z",
  full:
    "m9,21c0,0.55 0.45,1 1,1l4,0c0.55,0 " +
    "1,-0.45 1,-1l0,-1l-6,0l0,1zm3,-19c-3.86,0 -7,3.14 " +
    "-7,7c0,2.38 1.19,4.47 3,5.74l0,2.26c0,0.55 0.45,1 " +
    "1,1l6,0c0.55,0 1,-0.45 1,-1l0,-2.26c1.81,-1.27 " +
    "3,-3.36 3,-5.74c0,-3.86 -3.14,-7 -7,-7z",
};

/* Component that displays a bulb,
 * empty if this.props.lit is  false, full otherwise
 */
class LightBulbButton extends React.Component<Props> {
  render() {
    return (
      <IconButton onClick={this.props.handleClick} aria-label="change theme">
        <SvgIcon className={this.props.classes.svg}>
          <path d={this.props.lit ? bulb.full : bulb.empty} />
        </SvgIcon>
      </IconButton>
    );
  }
}

export default withStyles(styles)(LightBulbButton);
