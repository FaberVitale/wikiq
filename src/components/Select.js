//@flow
import React from "react";
import withStyles from "material-ui/styles/withStyles";
import { pure } from "recompose";
import { noop } from "../util/functions";
import ArrowDropDown from "material-ui-icons/ArrowDropDown";
import ButtonBase from "material-ui/ButtonBase";
import { contrastText } from "../theme";

const styles = {
  iconContainer: {
    /* a hack to make all pointer events have select as target
     * it is a bit complicated/not possible to programmatically toggle select:
     * https://stackoverflow.com/questions/249192/how-can-you-programmatically-tell-an-html-select-to-drop-down-for-example-due
     */
    position: "absolute",
    top: -1,
    right: 4,
    zIndex: 5,
    verticalAlign: "top",
    pointerEvents: "none",
    //inlne-block required to use transform
    display: "inline-block",
    color: contrastText,
    transformOrigin: "center",
    transform: "rotate(90deg)",
    transition: "transform 150ms ease-out",
    //points to bottom when select has focus
    "select:focus + &": {
      transform: "rotate(0deg)"
    }
  },
  root: {
    //stacking context for iconContainer
    position: "relative",
    display: "inline-block",
    color: contrastText,
    width: 64,
    backgroundColor: "transparent",
    border: 0,
    padding: "0 2px"
  },
  select: {
    outline: 0,
    color: contrastText,
    fontWeight: "bold",
    fontSize: "1em",
    //try to align select text with input["text"]
    paddingTop: 2,
    //for FF
    fontFamily: "Roboto",
    //remove default border
    border: 0,
    width: "100%",
    backgroundColor: "transparent",
    /*Hide arrow */
    "-moz-appearance": "none",
    "-webkit-appearance": "none",
    appearance: "none",
    //hide arrow for IE11
    "&::-ms-expand": {
      display: "none"
    },
    "&:focus": {
      outline: "none !important"
    },
    "&:-moz-focusring": {
      color: "white",
      outline: 0,
      border: 0,
      textShadow: "0 0 0 #000",
      textDecoration: "none"
    }
  },
  option: {
    color: "black"
  }
};

const Options = pure(({ options, className }) =>
  options.map((str, index) => (
    <option key={str} className={className} value={index}>
      {str}
    </option>
  ))
);

type Props = {
  classes: MUIClasses,
  options: Array<string>,
  id?: string,
  value: number,
  onChange: (evt: SyntheticInputEvent<*>) => void
};

class Select extends React.Component<Props> {
  static defaultProps = {
    options: [],
    handleChange: noop
  };

  selectRef = React.createRef();

  render() {
    const { classes, options, id, onChange, value } = this.props;

    return (
      <ButtonBase
        focusRipple
        component="div"
        tabIndex={-1}
        className={classes.root}
      >
        <select
          ref={this.selectRef}
          value={value}
          id={id || null}
          onChange={onChange}
          className={classes.select}
        >
          <Options options={options} className={classes.option} />
        </select>
        <span aria-hidden={true} className={classes.iconContainer}>
          <ArrowDropDown />
        </span>
      </ButtonBase>
    );
  }
}

export default pure(withStyles(styles)(Select));
