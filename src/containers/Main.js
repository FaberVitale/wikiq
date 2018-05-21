//@flow
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { routes, BACK_TO_TOP_THRESHOLD } from "../config";
import withStyles from "@material-ui/core/styles/withStyles";
import SearchResults from "../components/SearchResults";
import BackToTop from "../components/BackToTop";
import { nothing as Nothing } from "../util/functions";
import { scrollTo } from "../util/dom";
import { ScrollProvider, ScrollConsumer, bitmask } from "./Scroll";
import type { Scroll } from "./Scroll";
import { ViewportProvider } from "./Viewport";

const styles = {
  main: {
    display: "flex",
    flexFlow: "column nowrap",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    margin: "0 auto",
    padding: 16,
    "@media all and (min-width: 1064px)": {
      width: 1000
    }
  }
};

type Props = {
  classes: MUIClasses
};

const backToTopRender = ({ scrollY }: Scroll) => (
  <BackToTop
    scrollY={scrollY}
    threshold={BACK_TO_TOP_THRESHOLD}
    scrollTo={scrollTo}
  />
);

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
            <ScrollConsumer unstable_observedBits={bitmask.SCROLL_Y}>
              {backToTopRender}
            </ScrollConsumer>
          </main>
        </ScrollProvider>
      </ViewportProvider>
    );
  }
}

export default withStyles(styles)(Main);
