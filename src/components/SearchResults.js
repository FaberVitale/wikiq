//@flow
import React, { Fragment } from "react";
import Typography from "material-ui/Typography";
import { mapProps } from "recompose";
import withStyles from "material-ui/styles/withStyles";
import { deslugify } from "../util/query";
import ArticlesContainer from "../containers/Articles";
import Articles from "./Articles";
import { LOCALES_TO_LANGUAGE } from "../config";
import { xsDown } from "../theme";
import { ERROR_MESSAGE, NO_RESULTS, SEARCH_COMPLETED } from "../config";
import BottomPage from "../components/BottomPage";
import CircularProgress from "material-ui/Progress/CircularProgress";
import Button from "material-ui/Button";
import { $html } from "../util/dom";

const renderPropArticles = props => {
  const {
    error,
    hasMore,
    data,
    isLoadingMore,
    lang,
    query,
    loadMore,
    innerHeight
  } = props;

  let articles = data;
  /* If an error has occorred display a message */
  if (error) {
    return (
      <Fragment>
        <BottomPage>
          <Typography component="p" variant="title" color="secondary">
            {ERROR_MESSAGE}
          </Typography>
        </BottomPage>
      </Fragment>
    );
  }

  /* if articles have not been loaded and there's no error display a spinner */
  if (articles === null) {
    return (
      <Fragment>
        <BottomPage>
          <CircularProgress size={30} color="secondary" />
        </BottomPage>
      </Fragment>
    );
  }

  /* render articles and BottomPage 
   * the child of BottomPage depends on the current State
   */
  let bottomPageChild;

  if (isLoadingMore) {
    bottomPageChild = <CircularProgress size={30} color="secondary" />;
  } else if (hasMore) {
    const scrollHeight = $html ? $html.scrollHeight : -1;

    const isBodyLargerThanView = scrollHeight > 1 && scrollHeight > innerHeight;

    bottomPageChild = !isBodyLargerThanView ? (
      <Button variant="raised" color="secondary" onClick={loadMore}>
        {"Load More"}
      </Button>
    ) : null;
  } else {
    let msg = articles.length === 0 ? NO_RESULTS : SEARCH_COMPLETED;

    bottomPageChild = (
      <Typography component="p" color="secondary" variant="title">
        {msg}
      </Typography>
    );
  }

  return (
    <Fragment>
      <Articles lang={lang} query={query} articles={articles} />
      <BottomPage>{bottomPageChild}</BottomPage>
    </Fragment>
  );
};

const styles = {
  root: {
    padding: 16,
    //we have to set the width or ie11 wont wrap the flexbox items
    width: "100%",
    "@media all and (max-width: 700px)": {
      padding: "16px 4px"
    },
    [xsDown]: {
      padding: "16px 0"
    }
  },
  header: {
    width: "100%",
    marginBottom: 32
  },
  title: {
    marginBottom: 16
  }
};

/* extracts relevant props and removes other Route props */
const filterProps = mapProps(({ match, classes }) => ({
  lang: match.params.lang,
  query: deslugify(match.params.query),
  classes
}));

type Props = {
  lang: string,
  query: string,
  classes: MUIClasses
};

class SearchResults extends React.Component<Props> {
  render() {
    const { lang, query, classes } = this.props;

    const subheading = `${
      LOCALES_TO_LANGUAGE[lang]
    } Wikipedia, query: ${query}`;

    return (
      <article className={classes.root}>
        <header className={classes.header}>
          <Typography
            variant="display1"
            component="h2"
            align="left"
            color="secondary"
            className={classes.title}
          >
            {"Results"}
          </Typography>
          <Typography variant="subheading" component="p" color="textSecondary">
            {subheading}
          </Typography>
        </header>
        <ArticlesContainer
          lang={lang}
          query={query}
          render={renderPropArticles}
        />
      </article>
    );
  }
}

export default withStyles(styles)(filterProps(SearchResults));
