//@flow
import * as React from "react";
import CssBase from "../components/CssBase";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import * as themes from "../theme";
import Router from "react-router-dom/BrowserRouter";
import { connect } from "react-redux";
import { compose } from "redux";
import { changeTheme } from "../action/creators";
import type { State } from "../reducers";
import type { Dispatch } from "../action/types";
import { getTheme } from "../selectors";
import throttle from "lodash.throttle";
import {
  CHANGE_THEME_THROTTLE_TIME,
  ERROR_MESSAGE,
  APPBAR_MIN_HEIGHT
} from "../config";
import ErrorMessage from "../components/ErrorMessage";
import Loadable from "react-loadable";

const mapStateToProps = (state: State) => ({
  theme: getTheme(state)
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleTheme: throttle(
    compose(dispatch, changeTheme),
    CHANGE_THEME_THROTTLE_TIME,
    { trailing: false }
  )
});

type Props = {
  theme: string,
  toggleTheme: () => void
};

const AppBar = Loadable({
  loader: () => import("../components/AppBar"),
  loading: props =>
    props.error ? (
      <ErrorMessage style={{ height: APPBAR_MIN_HEIGHT }}>
        {ERROR_MESSAGE}
      </ErrorMessage>
    ) : null
});

const Main = Loadable({
  loader: () => import("./Main"),
  loading: props =>
    props.error ? (
      <ErrorMessage style={{ marginTop: APPBAR_MIN_HEIGHT + 16 }}>
        {ERROR_MESSAGE}
      </ErrorMessage>
    ) : null
});

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
