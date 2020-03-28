import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

const style = (theme) => ({
  paragraph: {
    color: theme.palette.primary.contrastText,
    padding: 16,
  },
});

type Props = {
  classes: MUIClasses,
  children: React.Node,
};

const defaultMessage = "an error has occurred";

const ErrorMessage = (props: Props) => {
  const { className, classes, ...rest } = this.props;

  return (
    <p
      className={
        className ? `${classes.paragraph} ${className}` : classes.paragraph
      }
      {...rest}
    >
      {props.children || defaultMessage}
    </p>
  );
};

export default withStyles(style)(ErrorMessage);
