import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { APPBAR_MIN_HEIGHT } from "../config";

const style = theme => ({
  paragraph: {
    color: "white",
    fontSize: 18,
    margin: `${APPBAR_MIN_HEIGHT + 16}px 16px 0 16px`
  }
});

type Props = {
  classes: MUIClasses,
  children: React.Node
};

const defaultMessage = "an error has occurred";

const ErrorMessage = (props: Props) => {
  return (
    <p className={props.classes.paragraph}>
      {props.children || defaultMessage}
    </p>
  );
};

export default withStyles(style)(ErrorMessage);
