//@flow
import React from "react";
import withStyles from "material-ui/styles/withStyles";
import { default as SearchForm } from "../containers/SearchForm";
import { default as LightBulb } from "../components/LightBulbButton";
import { APP_TITLE, APPBAR_MIN_HEIGHT } from "../config";
import { default as SearchFormView } from "./SearchForm";

const style = theme => ({
  header: {
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 1100,
    width: "100%",
    minHeight: APPBAR_MIN_HEIGHT,
    display: "flex",
    padding: 8,
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    boxShadow: theme.shadows[4]
  },
  control: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
    [theme.breakpoints.down("xs")]: {
      justifyContent: "space-between"
    }
  },
  srOnlyIfXS: {
    [theme.breakpoints.down("xs")]: {
      width: 1,
      height: 1,
      margin: -1,
      overflow: "hidden",
      border: 0,
      outline: 0,
      position: "absolute"
    }
  }
});

type Props = {
  classes: MUIClasses,
  toggleTheme: () => void,
  bulbLit: boolean
};

class AppBar extends React.Component<Props> {
  render() {
    return (
      <header className={this.props.classes.header}>
        <h1 className={this.props.classes.srOnlyIfXS}>{APP_TITLE}</h1>
        <div className={this.props.classes.control}>
          <SearchForm view={SearchFormView} />
          <LightBulb
            lit={this.props.bulbLit}
            handleClick={this.props.toggleTheme}
          />
        </div>
      </header>
    );
  }
}

export default withStyles(style)(AppBar);
