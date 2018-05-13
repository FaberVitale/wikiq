//@flow
import * as React from "react";
import CssBase from "../components/CssBase";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import * as themes from "../theme";
import AppBar from "../components/AppBar";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { changeTheme } from "../action/creators";
import type { State } from "../reducers";
import type { Dispatch } from "../action/types";
import { getTheme } from "../selectors";
import throttle from "lodash.throttle";
import { CHANGE_THEME_THROTTLE_TIME } from "../config";
import Main from "./Main";

const mapStateToProps = (state: State) => ({
  theme: getTheme(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleTheme: throttle(
    compose(dispatch, changeTheme),
    CHANGE_THEME_THROTTLE_TIME
  )
});

type Props = {
  theme: string,
  toggleTheme: () => void
};

class App extends React.Component<Props> {
  render() {
    return (
      <Router>
        <MuiThemeProvider theme={themes[this.props.theme]}>
          <React.Fragment>
            <CssBase />
            <AppBar
              bulbLit={this.props.theme === "light"}
              toggleTheme={this.props.toggleTheme}
            />
            <Main />
          </React.Fragment>
        </MuiThemeProvider>
      </Router>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
