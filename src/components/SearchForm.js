//@flow
import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Search from "@material-ui/icons/Search";
import Clear from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import Select from "./Select";
import type { ViewProps } from "../containers/SearchForm";

const style = theme => ({
  form: {
    display: "flex",
    flexFlow: "row nowrap",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 8px",
    borderRadius: 8,
    backgroundColor: theme.palette.primary.dark,
    [theme.breakpoints.down("xs")]: {
      flex: 1
    }
  },
  button: {
    color: theme.palette.primary.contrastText,
    height: 32
  },
  input: {
    backgroundColor: "transparent",
    color: theme.palette.primary.contrastText,
    border: 0,
    outline: 0,
    fontWeight: "bold",
    height: 24,
    fontSize: "1em",
    [theme.breakpoints.down("xs")]: {
      width: "100%"
    },
    // set placeholder color for chrome & FF
    "&::placeholder": {
      color: "rgba(255, 255, 255, 0.6)"
    },
    //for IE 11
    "&:-ms-input-placeholder": {
      color: "rgba(255, 255, 255, 0.6) !important"
    },
    //for Edge
    "&::-ms-input-placeholder": {
      color: "rgba(255, 255, 255, 0.6) !important"
    }
  },
  offScreen: {
    width: 1,
    height: 1,
    margin: -1,
    overflow: "hidden",
    border: 0,
    outline: 0,
    position: "absolute"
  },
  clear: {
    height: 24,
    alignSelf: "center",
    color: theme.palette.primary.contrastText,
    "& > span > svg": {
      width: 24,
      height: 24
    }
  },
  formControls: {
    display: "flex",
    flexFlow: "row nowrap",
    [theme.breakpoints.down("xs")]: {
      flex: 1
    }
  },
  inputContainer: {
    display: "inline-block",
    minWidth: 60,
    [theme.breakpoints.down("xs")]: {
      flex: 1
    }
  }
});

type Props = ViewProps & {
  classes: MUIClasses
};

/* applied to the clear button when input.value.length === 0 */
const hiddenStyle = {
  visibility: "hidden"
};

class SearchForm extends React.Component<Props> {
  inputRef: ?HTMLElement; // input[type="search"] ref
  submitRef: ?HTMLElement; // button[type="submit"] ref

  getInputRef = elem => {
    this.inputRef = elem;
  };

  getSubmitRef = elem => {
    this.submitRef = elem;
  };

  handleSubmit = evt => {
    evt.preventDefault();

    if (this.submitRef) {
      this.submitRef.focus();
    }
    this.props.handlers.submit();
  };

  handleClear = evt => {
    if (this.inputRef) {
      this.inputRef.focus();
    }

    this.props.handlers.clear(evt);
  };

  render() {
    const { state, handlers, options, classes } = this.props;

    return (
      <form className={classes.form} onSubmit={this.handleSubmit}>
        <label className={classes.offScreen} htmlFor="select-lang">
          {"Language"}
        </label>
        <div className={classes.formControls}>
          <Select
            id="select-lang"
            value={state.index}
            onChange={handlers.selectChange}
            options={options}
          />
          <div className={classes.inputContainer}>
            <input
              ref={this.getInputRef}
              type="search"
              autoComplete="off"
              id="main-q"
              aria-label="Search"
              placeholder="Search"
              className={classes.input}
              value={state.input}
              onChange={handlers.inputChange}
            />
          </div>
          <IconButton
            aria-label="clear input"
            type="button"
            className={classes.clear}
            hidden={state.input.length === 0}
            onClick={this.handleClear}
            style={state.input.length > 0 ? null : hiddenStyle}
          >
            <Clear />
          </IconButton>
        </div>
        <IconButton
          buttonRef={this.getSubmitRef}
          aria-label="submit"
          type="submit"
          className={classes.button}
        >
          <Search />
        </IconButton>
      </form>
    );
  }
}

export default withStyles(style)(SearchForm);
