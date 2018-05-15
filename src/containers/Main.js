//@flow
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { routes, BACK_TO_TOP_THRESHOLD } from "../config";
import withStyles from "@material-ui/core/styles/withStyles";
import SearchResults from "../components/SearchResults";
import BackToTop from "../components/BackToTop";
import { nothing as Nothing } from "../util/functions";
import { scrollTo } from "../util/dom";
import { ScrollProvider } from "./Scroll";
import { ViewportProvider } from "./Viewport";
import { shadows } from "../theme";

const styles = {
  main: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    minHeight: "calc(100vh - 96px)",
    "@media all and (min-width: 1064px)": {
      width: 1000,
      boxShadow: shadows[3],
      margin: "16px auto"
    },
    "@media all and (max-width: 1063px)": {
      boxShadow: "none",
      width: "100%",
      padding: "16px 8px",
      margin: "16px 0"
    }
  }
};

type Props = {
  classes: MUIClasses
};

class Main extends React.Component<Props> {
  render() {
    return (
      <ViewportProvider>
        <ScrollProvider>
          <main className={this.props.classes.main}>
            <Switch>
              <Route exact path={routes.search} component={SearchResults} />
              <Route exact path={routes.home} component={Nothing} />
              <Redirect exact from="*" to={routes.home} />
            </Switch>
            <BackToTop threshold={BACK_TO_TOP_THRESHOLD} scrollTo={scrollTo} />
          </main>
        </ScrollProvider>
      </ViewportProvider>
    );
  }
}

export default withStyles(styles)(Main);
